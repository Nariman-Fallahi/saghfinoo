from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from common.utils import validations
from .models import Mainpage
from .serializers import MainpageResponseSerializer
# Create your views here.

class GetMainpageAPIView(APIView):

    def get(self, req, page):
        try:
            validations.validate_username(page)
        except ValueError as v:
            return Response({'errors':{'page':str(v)}, 'status':400})
        
        try:
            mainpage = Mainpage.objects.filter(page=page)
        except Mainpage.DoesNotExist:
            return Response({'errors':{'non-field-error':'mainpage not found'}, 'status':404})

        mainpage = MainpageResponseSerializer(mainpage, many=True)

        return Response({'data':mainpage, 'status':200})