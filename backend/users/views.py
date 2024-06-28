import random
import datetime

from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework.authtoken.models import Token
from rest_framework.authentication import authenticate

from common.utils.tempdb import TempDB
from common.codes import users_codes
from .serializers import VerifyNumberSerializer, SigninSerializer, SignupSerializer
from .models import CustomUser

NUMBER_WAIT_TIME = datetime.timedelta(0, 30)
tempdb = TempDB(NUMBER_WAIT_TIME)


@api_view(['POST'])
def verify_number(req):

    # if req.method == "POST":
    serializer = VerifyNumberSerializer(data=req.data)
    if serializer.is_valid():
        if serializer.data.get('code') == 0:
            # send code to number

            now = datetime.datetime.now()
            # delay for send code to a number
            if tempdb.get(serializer.data.get('number'), now) > now:
                return Response({"error":f"wait {round((tempdb.get(serializer.data.get('number'), now) - now).total_seconds())} seconds", "code": users_codes.NUMBER_DELAY}, status=400)
            
            code = random.randint(10000, 99999)
            # todo: send code
            print("code:", code)
            tempdb.set(serializer.data.get('number'), now+NUMBER_WAIT_TIME)
            req.session['code'] = code
            req.session['number'] = serializer.data.get('number')
            req.session['try'] = 0
            return Response({"msg":"code sent to number", "code":users_codes.CODE_SENT_TO_NUMBER}, status=200)
        else:
            # check code

            if req.session.get('try', 0) > 5:
                return Response({"error":"to manay tries", "code":users_codes.TO_MANNY_TRIES}, status=400)
            
            if req.session.get('code', 0) == 0:
                return Response({"error":"zero the code first", "code":users_codes.ZERO_CODE_FIRST}, status=400)

            if serializer.data.get('code') == req.session['code']:
                # sign in or go sign up
                
                del req.session['code']
                del req.session['try']

                user = CustomUser.objects.filter(number=req.session['number'])
                if len(user) == 0:
                    # signup
                    # user not exist go to signup
                    
                    req.session['must signup'] = True
                    return Response({"msg":"Auth done. Go to /api/v1/complete-signup", "code":users_codes.COMPLETE_SIGNUP}, status=200)
                else:
                    # login
                    
                    # password = CustomUser.objects.first(number=serializer.data['number']).password
                    user = user[0]
                    token, created = Token.objects.get_or_create(user=user)
                    return Response({"msg":"You are in!", 'token':token.key, "code":users_codes.LOGIN_DONE}, status=200)
            else:
                # wrong code
                req.session['try'] = req.session.get('try', 0) + 1
                return Response({"error":"wrong code", "code":users_codes.WRONG_CODE}, status=400)                
            
        
    return Response({"errors":serializer.errors, "code":users_codes.INVALID_FIELD}, status=400)


@api_view(['POST'])
def signup(req):
    # check number is verified before
    if req.session.get('must signup', '') != True:
        return Response({"error":"verifiy number first", "code":users_codes.VERIFY_NUMBER_FIRST}, status=400)

    # check is user created before
    user = CustomUser.objects.filter(number=req.session['number'])
    if len(user) > 0:
        return Response({"error":"user already created", "code":users_codes.USER_EXIST}, status=400)

    serializer = SignupSerializer(data=req.data)
    if serializer.is_valid():
        user = CustomUser()
        user.first_name = serializer.data['first_name']
        user.last_name = serializer.data['last_name']
        user.number = req.session['number']
        user.set_password(serializer.data['password'])
        user.save()

        token, created = Token.objects.get_or_create(user=user)
        return Response({"msg":"done", "token":token.key, "code":users_codes.LOGIN_DONE}, status=201)
    return Response({"errors":serializer.errors, "codes":users_codes.INVALID_FIELD}, status=400)


@api_view(['POST'])
def login(req):
    serializer = SigninSerializer(data=req.data)
    if serializer.is_valid():
        user = authenticate(username=serializer.data['number'], password=serializer.data['password'])

        if user:
            token, created = Token.objects.get_or_create(user=user)

            return Response({"msg":"You are in!", "token":token.key, "code":users_codes.LOGIN_DONE}, status=200)
        else:
            return Response({"error":"incurrect number or password", "code":users_codes.INCURRECT_NUMBER_OR_PASSWORD}, status=400)
    return Response({"errors":serializer.errors, "code":users_codes.INVALID_FIELDS}, status=400)


@api_view(["GET"])
@permission_classes((IsAuthenticated, ))
def am_i_in(req):
    return Response({"You are in!"}, status=200)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def logout(req):
    Token.objects.delete(user=req.user)
    return Response({"msg":"done!"}, status=200)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_user_info(req):
    return Response({"first_name":req.user.first_name, "last_name":req.user.last_name, "number":req.user.number}, status=200)