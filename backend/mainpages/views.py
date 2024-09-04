from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from common.utils import validations
from common.utils.permissions import IsAdmin
from .models import Mainpage
from .serializers import MainpageResponseSerializer, MainpageSerializer
# Create your views here.

class GetMainpageAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return super().get_permissions()

    def get(self, req, page):
        try:
            validations.validate_username(page)
        except ValueError as v:
            return Response({'errors':{'page':str(v)}, 'status':400})
        
        try:
            mainpage = Mainpage.objects.filter(page=page)
        except Mainpage.DoesNotExist:
            return Response({'errors':{'non-field-error':'mainpage not found'}, 'status':404})

        mainpage = MainpageResponseSerializer(mainpage, many=True).data

        return Response({'data':mainpage, 'status':200})
    
    def post(self, req, page):
        try:
            validations.validate_username(page)
        except ValueError as v:
            return Response({'errors':{'page':str(v)}, 'status':400})
 
        serializer = MainpageSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save(page=page)
        
            return Response({'msg':'done', 'status':200})

        return Response({'errors':serializer.errors, 'status':400})