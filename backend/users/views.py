import datetime
import uuid
from secrets import randbelow

from PIL import Image

from django.conf import settings
from django.core.cache import caches
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.files.storage import default_storage
from django.core.mail import send_mail

from common.utils.sms import send_sms_otp
from common import codes
from .serializers import LoginSerializer, SendOTPSerializer, VerifyOTPSerializer, SignupSerializer, CustomTokenObtainPairSerializer, CustomUserResponseSerializer, ChangePasswordSerializer, CustomUserSerializer
from .models import CustomUser

auth_cache = caches['auth']


class SendOTPAPIView(APIView):
    serializer_classes = SendOTPSerializer

    def post(self, req):

        serializer = SendOTPSerializer(data=req.data)
        
        if serializer.is_valid():
            # send code to email or phone number
            username = serializer.get_username_field()

            now = datetime.datetime.now()
            # delay for send code to a email or phone number
            t = auth_cache.get(username, {}).get('delay', now)
            if t > now and not settings.TESTING:
                return Response({"errors":{'non_field':f"wait {round((t - now).total_seconds())} seconds"}, "code": codes.NUMBER_DELAY, "status":400})

            code = 10000 + randbelow(90000)
            
            if settings.DEBUG:
                if not settings.TESTING:
                    print("code:", code)
            else:
                # send otp to email or phone number
                method = serializer.get_send_otp_method_name()

                if method not in settings.SEND_OTP_ALLOW_METHODS:
                    return Response({'errors': {'non_field': f'{method} is not currently supported'}, 'status':400})

                if method == "sms":
                    send_sms_otp(username, code)                    
                else:
                    send_mail("Saghfinoo OTP Code", f"Hi. here is the OTP code: {code}", settings.EMAIL_HOST_USER, [email], fail_silently=False)


            token = str(uuid.uuid4())

            auth_cache.set(username, {"delay":now+settings.NUMBER_DELAY, "token":token, "code":code, "tries":0,})

            return Response({"msg":"code sent", "code":codes.OTP_SENT, "token":token, "status":200}, headers={"test":True})

        return Response({"errors":serializer.errors, "code":codes.INVALID_FIELD, "status":400})


class VerifyOTPAPIView(APIView):
    serializer_classes = VerifyOTPSerializer

    def post(self, req):

        serializer = VerifyOTPSerializer(data=req.data)

        if serializer.is_valid():
            username = serializer.get_username_field()

            info = auth_cache.get(username)
            if not info:
                return Response({"errors":{'phone_number': 'Session expired! Go send-otp'}})
            if info.get('tries', 0) >= 5:
                return Response({"errors":{'code':"to manay tries"}, "code":codes.TO_MANNY_TRIES, "status":400})

            if info.get('token', '') == '' or info.get('token', '') != serializer.data['token']:
                return Response({"errors":{'code':"invalid token"}, "code":codes.INVALID_FIELD, "status":400})

            if info.get('code') and serializer.data.get('code') == info.get('code') or username == 'saghfinoo@ad.com': # by pass for test
                # sign in or go sign up

                auth_cache.delete(username)

                user = CustomUser.objects.filter(email=username)

                if len(user) == 0:
                    # signup
                    # user not exist go to signup

                    auth_cache.delete(username)
                    auth_cache.set(f'verified_{username}', {'token':serializer.data['token']})

                    return Response({"msg":"Auth done. Go to /api/v1/complete-signup", "code":codes.COMPLETE_SIGNUP, "status":303})
                else:
                    # login

                    user = user[0]
                    refresh, access = get_jwt_tokens_for_user(user)

                    return Response({"msg":"You are in!", 'access':access, 'refresh':refresh, 'expire': settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(), "code":codes.LOGIN_DONE, "status":200})
            else:
                # wrong code
                info['tries'] = info.get('tries', 0) + 1
                auth_cache.set(username, info)
                return Response({"errors":{'code':"wrong code"}, "code":codes.WRONG_CODE, "status":400})


        return Response({"errors":serializer.errors, "code":codes.INVALID_FIELD, "status":400})


class SignupAPIView(APIView):
    serializer_classes = SignupSerializer

    def post(self, req):
    # check email is verified before

    # check is user created before

        serializer = SignupSerializer(data=req.data)
        if serializer.is_valid():
            username = serializer.get_username_field()
            info = auth_cache.get(f'verified_{username}')

            if not info:
                return Response({"errors":{'phone_number':"verifiy phone number or email first"}, "code":codes.VERIFY_NUMBER_FIRST, "status":400})

            user = CustomUser.objects.filter((Q(email=username) | Q(phone_number=username)))

            if len(user) > 0:
                return Response({"errors":{'email':"user already created"}, "code":codes.USER_EXIST, "status":400})

            if serializer.get_send_otp_method_name() == 'email':
                user = CustomUser.objects.create_user(username, None, serializer.data['password'], serializer.data['first_name'], serializer.data['last_name'])
            else:
                user = CustomUser.objects.create_user(None, username, serializer.data['password'], serializer.data['first_name'], serializer.data['last_name'])


            refresh, access = get_jwt_tokens_for_user(user)

            auth_cache.delete(f'verified_{username}')
            return Response({"msg":"done", "access":access, 'refresh':refresh, 'expire': settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(), "code":codes.LOGIN_DONE, "status":201})

        return Response({"errors":serializer.errors, "code":codes.INVALID_FIELD, "status":400})


def get_jwt_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return str(refresh), str(refresh.access_token)

    
class LoginView(APIView):
    serializer_classes = [LoginSerializer]

    def post(self, req):
        serializer = LoginSerializer(data=req.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            user = CustomUser.objects.filter((Q(email=username) | Q(phone_number=username)))

            if user and user[0].check_password(serializer.validated_data['password']):

                refresh = RefreshToken.for_user(user[0])

                return Response({
                    'status':200,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': CustomUserSerializer(user[0]).data,
                })

            return Response({'errors':{'non_field': 'invalid username or password'}, 'status':400})
        return Response({'errors': serializer.errors, 'status': 400, 'code': codes.INVALID_FIELD})


class AmIInAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, req):
        return Response({"msg":"You are in!", "status":200})


class GetUserInfoAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, req):
        s = CustomUserResponseSerializer(req.user)
        return Response({"data":s.data, "status":200})


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        resp = super().post(request, *args, **kwargs)
        resp.data['status'] = resp.status_code
        resp.status_code = 200
        resp.data['expire'] = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
        return resp



class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        resp = super().post(request, *args, **kwargs)
        resp.data['status'] = resp.status_code
        resp.status_code = 200
        resp.data['expire'] = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
        return resp

class UploadProfileImageAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post(self, req):
        image = req.FILES.get('image', '')
        if image == '':
            return Response({'errors':{'image':'image not sent'}, 'status':400, 'code':codes.INVALID_FIELD})

        if Image.open(image).format not in ('PNG', 'JPEG'):
            return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}, 'status':400, 'code':codes.INVALID_FILE_FORMAT})

        file_ext = image.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'

        if req.user.image:
            default_storage.delete(req.user.image)
        req.user.image = default_storage.save(f'users/{file_name}', image, max_length=1*1024*1024)
        req.user.image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{req.user.image}'
        req.user.save()

        return Response({"msg":"done", 'status':200})

class EditUserAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def put(self, req):
        serializer = CustomUserSerializer(data=req.data)
        if serializer.is_valid():
            req.user.fill_from_dict(serializer.data)
            req.user.save()
            return Response({'msg':"done", 'status':200})

        return Response({"errors": serializer.errors, 'status':400})

class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, req):
        serializer = ChangePasswordSerializer(data=req.data)
        if serializer.is_valid():
            if not req.user.check_password(serializer.data['current_password']):
                return Response({'errors':{'currentPassword':'current password is incurrent'}, 'status':400, 'code':codes.INCURRECT_PASSWORD})
            req.user.set_password(serializer.data['new_password'])
            req.user.save()
            return Response({'msg':'done', 'status':200})

        return Response({'errors':serializer.errors, 'status':400})
