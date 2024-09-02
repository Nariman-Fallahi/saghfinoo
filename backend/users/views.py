import random
import datetime
import uuid

from PIL import Image

from django.conf import settings
from django.core.cache import caches
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.files.storage import default_storage

from common import codes
from .serializers import VerifyNumberSerializer, SignupSerializer, CustomTokenObtainPairSerializer, CustomUserResponseSerializer, ChangePasswordSerializer, CustomUserSerializer
from .models import CustomUser

auth_cache = caches['auth']

class VerifyNumberAPIView(APIView):
    serializer_classes = VerifyNumberSerializer

    def post(self, req):

        serializer = VerifyNumberSerializer(data=req.data)
        if serializer.is_valid():
            number = serializer.data['number']
            if serializer.data.get('code') == 0:
                # send code to number
            
                now = datetime.datetime.now()
                # delay for send code to a number
                t = auth_cache.get(number, {}).get('delay', now)
                if t > now and not settings.TESTING:
                    return Response({"errors":{'number':f"wait {round((t - now).total_seconds())} seconds"}, "code": codes.NUMBER_DELAY, "status":400})
                
                code = random.randint(10000, 99999)
                # todo: send code
                if settings.DEBUG and not settings.TESTING:
                    print("code:", code)
                token = str(uuid.uuid4())

                auth_cache.set(number, {"delay":now+settings.NUMBER_DELAY, "token":token, "code":code, "tries":0,})
                
                return Response({"msg":"code sent to number", "code":codes.CODE_SENT_TO_NUMBER, "token":token, "status":200}, headers={"test":True})
            else:
                # check code
                info = auth_cache.get(number, {})
                if info.get('tries', 0) >= 5:
                    return Response({"errors":{'code':"to manay tries"}, "code":codes.TO_MANNY_TRIES, "status":400})

                if info.get('token', '') == '' or info.get('token', '') != serializer.data['token']:
                    return Response({"errors":{'code':"zero the code first"}, "code":codes.ZERO_CODE_FIRST, "status":400})

                if serializer.data.get('code') == info.get('code', 0):
                    # sign in or go sign up
                    
                    auth_cache.delete(number)

                    user = CustomUser.objects.filter(number=number)

                    if len(user) == 0:
                        # signup
                        # user not exist go to signup
                        
                        auth_cache.set(number, {'token':serializer.data['token'],'must signup':True})

                        return Response({"msg":"Auth done. Go to /api/v1/complete-signup", "code":codes.COMPLETE_SIGNUP, "status":303})
                    else:
                        # login
                        
                        # password = CustomUser.objects.first(number=serializer.data['number']).password
                        user = user[0]
                        refresh, access = get_jwt_tokens_for_user(user)
        
                        return Response({"msg":"You are in!", 'access':access, 'refresh':refresh, 'expire': settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(), "code":codes.LOGIN_DONE, "status":200})
                else:
                    # wrong code
                    info['tries'] = info.get('tries', 0) + 1
                    auth_cache.set(number, info)
                    return Response({"errors":{'code':"wrong code"}, "code":codes.WRONG_CODE, "status":400})                
                
            
        return Response({"errors":serializer.errors, "code":codes.INVALID_FIELD, "status":400})

class SignupAPIView(APIView):
    serializer_classes = SignupSerializer

    def post(self, req):
    # check number is verified before

    # check is user created before
    
        serializer = SignupSerializer(data=req.data)
        if serializer.is_valid():
            
            info = auth_cache.get(serializer.data['number'], {})

            if not info.get('must signup', False):
                return Response({"errors":{'number':"verifiy number first"}, "code":codes.VERIFY_NUMBER_FIRST, "status":400})

            user = CustomUser.objects.filter(number=serializer.data['number'])
            if len(user) > 0:
                return Response({"errors":{'number':"user already created"}, "code":codes.USER_EXIST, "status":400})

            user = CustomUser()
            user.fill_from_dict(serializer.data)
            user.set_password(serializer.data['password'])
            user.save()

            refresh, access = get_jwt_tokens_for_user(user)
            
            return Response({"msg":"done", "access":access, 'refresh':refresh, 'expire': settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(), "code":codes.LOGIN_DONE, "status":201})
        return Response({"errors":serializer.errors, "code":codes.INVALID_FIELD, "status":400})


def get_jwt_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return str(refresh), str(refresh.access_token)


# @api_view(['POST'])
# def login(req):
#     serializer = SigninSerializer(data=req.data)
#     if serializer.is_valid():
#         user = authenticate(username=serializer.data['number'], password=serializer.data['password'])

#         if user:
#             token, created = Token.objects.get_or_create(user=user)

#             return Response({"msg":"You are in!", "token":token.key, "code":codes.LOGIN_DONE, "status":200})
#         else:
#             return Response({"error":"incurrect number or password", "code":codes.INCURRECT_NUMBER_OR_PASSWORD, "status":400})
#     return Response({"errors":serializer.errors, "code":codes.INVALID_FIELD, "status":400})


class AmIInAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, req):
        return Response({"msg":"You are in!", "status":200})


# @api_view(["POST"])
# @permission_classes((IsAuthenticated,))
# def logout(req):
#     req.user.auth_token.delete()
#     return Response({"msg":"done!", "status":200})


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

