from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import random
from django.contrib.auth import login
from common.utils.tempdb import TempDB
import datetime

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
            
            now = datetime.datetime.now()
            
            if tempdb.get(serializer.data.get('number'), now) > now:
                return Response({"error":f"wait {round((tempdb.get(serializer.data.get('number'), now) - now).total_seconds())} seconds"})
            
            code = random.randint(10000, 99999)
            # todo: send code
            print("code:", code)
            tempdb.set(serializer.data.get('number'), now+NUMBER_WAIT_TIME)
            req.session['code'] = code
            req.session['number'] = serializer.data.get('number')
            req.session['try'] = 0
            return Response({"msg":"code sent to number"}, status=200)
        else:
            if req.session.get('try', 0) > 5:
                return Response({"error":"to manay tries"})
            
            if serializer.data.get('code') == req.session['code']:
                # sign in or go sign up
                user = CustomUser.objects.filter(number=req.session['number'])
                if len(user) == 0:
                    # user not exist go to signup
                    req.session['must signup'] = True
                    return Response({"msg":"Auth done. Go to /api/v1/complete-signup"}, status=200)
                else:
                    login(req, user[0])
                    return Response({"msg":"You are in!"}, status=200)
            else:
                req.session['try'] = req.session.get('try', 0) + 1
                return Response({"error":"invalid code"}, status=400)                
            
        
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def signup(req):
    user = CustomUser.objects.filter(number=req.session['number'])
    if len(user) > 0:
        return Response({"error":"user already created"}, status=400)

    serializer = SignupSerializer(data=req.data)
    if serializer.is_valid():
        user = CustomUser()
        user.first_name = serializer.data['first_name']
        user.last_name = serializer.data['last_name']
        user.number = req.session['number']
        user.set_password(req.session['password'])
        user.save()
        return Response(user, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def login(req):
    serializer = SigninSerializer(data=req.data)
    if serializer.is_valid():
        user = CustomUser.objects.filter(number=serializer.data['number'], password=serializer.data['password'])
        if len(user) > 0:
            login(user[0])
            return Response({"msg":"You are in!"}, status=200)
        else:
            return Response({"error":"incurrect number or password"}, status=400)
    return Response(serializer.errors, status=400)