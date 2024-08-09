import uuid
from PIL import Image

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.files.storage import default_storage
from django.conf import settings
from django.db.models import Q

from common.utils.request import get_page_and_limit
from common import codes
from common.utils import validations

from .serializers import RealtorSerializer, RealtorResponseSerializer, RealtorPreviewResponseSerializer
from .models import Realtor


class CreateRealtor(APIView):
    serializer_class = RealtorSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, req):
        serializer = RealtorSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save(user=req.user)
            return Response({"msg":"done", 'status':200})
        return Response({"errors":serializer.errors, 'status':400})
    


class GetAllRealtorAPIView(APIView):

    def get(self, req):
        try:
            page, limit = get_page_and_limit(req)
        except Exception as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})
        
        reo = Realtor.objects.filter(is_confirmed=True).values(*RealtorPreviewResponseSerializer.Meta.fields)[page*limit:page*limit+limit]
        
        return Response({'data':reo, 'status':200})
    
class GetRealtorAPIView(APIView):
    """get real estate office by username"""
    def get(self, req, realtor_id):
        try:
            reo = Realtor.objects.values(*RealtorResponseSerializer.Meta.fields).get(is_confirmed=True, id=realtor_id)
            return Response({"data":reo, 'status':200})        
        except Realtor.DoesNotExist:
            return Response({'status':404})



class SearchRealtorsAPIView(APIView):

    def get(self, req):
        qp = dict(req.query_params)
        try:
            page, limit = get_page_and_limit(req)
        except Exception as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})

            


        query = None
        if qp.get('city', '') != '':
            if type(qp['city']) == list:
                for c in qp['city']:
                    if query:
                        query |= Q(real_estate_office__city=c)
                    else:
                        query = Q(real_estate_office__city=c)
            
            
        if query:
            query &= Q(is_confirmed=True)
        else:
            query = Q(is_confirmed=True)

        if req.query_params.get('reo_username', '') != '':
            query &= Q(real_estate_office__username=req.query_params['reo_username'])

        reo = Realtor.objects.values(*RealtorPreviewResponseSerializer.Meta.fields).filter(query)[page*limit: page*limit+limit]
    
        return Response({'data':reo, 'status':200})



class UploadRealtorBGImageAPIView(APIView):

    def post(self, req):
            image = req.FILES.get('image', '')
            if image == '':
                return Response({'errors':{'image':'image not sent'}})

            if Image.open(image).format not in ('PNG', 'JPEG'):
                return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}})
            
            file_ext = image.name.split('.')[-1]
            file_name = f'{uuid.uuid4()}.{file_ext}'
            try:
                realtor = Realtor.objects.get(user=req.user)
            except Realtor.DoesNotExist:
                return Response({'errors':{'user':'user not realtor'}, 'code':codes.USER_IS_NOT_REALTOR, 'status':404})

            if realtor.bg_image:
                default_storage.delete(realtor.bg_image)
            realtor.bg_image = default_storage.save(f'users/{file_name}', image, max_length=1*1024*1024)
            realtor.bg_image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{realtor.bg_image}'
            realtor.save()

            return Response({"msg":"done", 'status':200})