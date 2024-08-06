import uuid

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, OR
from rest_framework_simplejwt.authentication import JWTAuthentication
from PIL import Image
from django.core.files.storage import default_storage
from django.conf import settings

from common.utils.permissions import IsRealEstateOwner, IsAdmin, IsRealtor
from common.utils.request import get_page_and_limit
from common import codes
from common.utils import validations

from .serializers import RealEstateSerializer, RealEstatePreviewResponseSerializer, RealEstateResponseSerializer
from .models import RealEstate, RealEstateImage, RealEstateChoice



class CreateRealEstateAPIView(APIView):
    """after create, real estate office must be confirmed by admin"""

    serializer_class = RealEstateSerializer
    permission_classes = [IsAuthenticated, IsRealtor]
    authentication_classes = [JWTAuthentication]

    def post(self, req):
        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            serializer.save(owner=req.realtor)
            return Response({"msg": "done", 'status':200})
        return Response({"errors": serializer.errors, 'code':codes.INVALID_FIELD, 'status':400})
    

    def get(self, req):
        key = req.query_params.get('key', '')
        # validate key
        try:
            validations.validate_username(key)
        except ValueError as e:
            return Response({'errors':{'non-field-error':str(e)}})
        if key == '':
            recs = RealEstateChoice.objects.all().values('id','key', 'value')
        else:
            recs = RealEstateChoice.objects.filter(key=key).values('id', 'key', 'value')
        return Response({'data':recs, 'status':200})


class EditRealEstateAPIView(APIView):

    serializer_class = RealEstateSerializer
    permission_classes = [IsAuthenticated, IsRealEstateOwner | IsAdmin]
    authentication_classes = [JWTAuthentication]

    def put(self, req, real_estate_id):
        try:
            real_estate = RealEstate.objects.get(id=real_estate_id)
        except:
            return Response({"errors":{"non-field-error":"real estate not found"}, 'status':404})
        self.check_object_permissions(req, real_estate)

        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            serializer.save(id=real_estate_id)
            return Response({"msg":"done", 'status':200})
        return Response({"errors": serializer.errors, 'code':codes.INVALID_FIELD, 'status':400})
    #todo: user can enter same username in real estate office in edit
class GetAllRealEstatesAPIView(APIView):

    def get(self, req):
        try:
            page, limit = get_page_and_limit(req)
        except Exception as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})
        
        reo = RealEstate.objects.filter(is_confirmed=True).values(*RealEstatePreviewResponseSerializer.Meta.fields)[page*limit:page*limit+limit]
        
        return Response({'data':reo, 'status':200})
    
class GetRealEstateAPIView(APIView):
    """get real estate office by id"""
    def get(self, req, real_estate_id):
        try:
            reo = RealEstate.objects.values(*RealEstateResponseSerializer.Meta.fields).get(is_confirmed=True, id=real_estate_id)
            reo['images'] = RealEstateImage.objects.filter(real_estate=reo['id']).values('image_full_path', 'id')
            
            return Response({"data":reo, 'status':200})        
        except RealEstate.DoesNotExist:
            return Response({'status':404})
        
class SearchRealEstatesAPIView(APIView):

    def get(self, req):
        pass

class UploadRealEstateImageAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def post(self, req, real_estate_id):
        image = req.FILES.get('image', '')
        if image == '':
            return Response({'errors':{'image':'image not sent'}})

        if Image.open(image).format not in ('PNG', 'JPEG'):
            return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}})
    
        try:
            re = RealEstate.objects.get(id=real_estate_id, owner__user=req.user)
        except RealEstate.DoesNotExist:
            return Response({'errors':{'non-field-error':'real estate not found or you not owner of that real estate'}, 'status':404})

        file_ext = image.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'

        if RealEstateImage.objects.filter(real_estate=re).count() >= 10:
            return Response({'error':{'non-field-error':'maximum image upload limit for real estate'}, 'status':400})


        rei = RealEstateImage()
        rei.real_estate = re
        rei.image = default_storage.save(f'real_estate_offices/{file_name}', image, max_length=1*1024*1024)
        rei.image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{rei.image}'
        rei.save()

        if re.image_full_path == '':
            re.image_full_path = rei.image_full_path
            re.save()

        return Response({"msg":"done", 'status':200})



