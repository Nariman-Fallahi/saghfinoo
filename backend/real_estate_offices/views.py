import uuid

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, OR
from rest_framework_simplejwt.authentication import JWTAuthentication
from PIL import Image
from django.core.files.storage import default_storage
from django.conf import settings

from common.utils.permissions import IsOwner, IsAdmin, IsRealtor
from common.utils.request import get_page_and_limit

from .serializers import RealEstateOfficeSerializer, RealEstateOfficePreviewResponseSerializer, RealEstateOfficeResponseSerializer
from .models import RealEstateOffice



class CreateRealEstateOfficeAPIView(APIView):
    """after create, real estate office must be confirmed by admin"""

    serializer_class = RealEstateOfficeSerializer
    permission_classes = [IsAuthenticated, IsRealtor]
    authentication_classes = [JWTAuthentication]

    def post(self, req):
        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            try:
                reo = RealEstateOffice.objects.get(owner=req.user)
                return Response({'errors':{"user":"user is already owner of "+reo.name}, 'status':400})
            except RealEstateOffice.DoesNotExist:
                serializer.save(owner=req.realtor.user)
                return Response({"msg": "done", 'status':200})
        return Response({"errors": serializer.errors, 'status':400})
    
class EditRealEstateOfficeAPIView(APIView):

    serializer_class = RealEstateOfficeSerializer
    permission_classes = [IsAuthenticated, OR(IsOwner, IsAdmin)]
    authentication_classes = [JWTAuthentication]

    def put(self, req):
        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"done", 'status':200})
        return Response({"errors": serializer.errors, 'status':400})

class GetAllRealEstateOfficeAPIView(APIView):

    def get(self, req):
        try:
            page, limit = get_page_and_limit(req)
        except Exception as e:
            return Response({'errors':e.dict, 'status':400})
        
        reo = RealEstateOffice.objects.filter(is_confirmed=True).values(*RealEstateOfficePreviewResponseSerializer.Meta.fields)[page*limit:page*limit+limit]
        
        return Response({'data':reo, 'status':200})
    
class GetRealEstateOfficeAPIView(APIView):

    def get(self, req, slug):
        try:
            reo = RealEstateOfficeResponseSerializer(RealEstateOffice.objects.get(is_confirmed=True, username=slug))
            return Response({"data":reo.data, 'status':200})        
        except RealEstateOffice.DoesNotExist:
            return Response({'status':404})
        


class UploadRealEstateOfficeImageAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def post(self, req):
        image = req.FILES.get('image', '')
        if image == '':
            return Response({'errors':{'image':'image not sent'}})

        if Image.open(image).format not in ('PNG', 'JPEG'):
            return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}})
        
        try:
            reo = RealEstateOffice.objects.get(owner=req.user)
        except RealEstateOffice.DoesNotExist:
            return Response({'errors':{'user':'user not owner of any real estate office'}, 'status':404})

        file_ext = image.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'

        if reo.image:
            default_storage.delete(req.user.image)
        reo.image = default_storage.save(f'real_estate_offices/{file_name}', image, max_length=1*1024*1024)
        reo.image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{req.user.image}'
        reo.save()

        return Response({"msg":"done", 'status':200})
