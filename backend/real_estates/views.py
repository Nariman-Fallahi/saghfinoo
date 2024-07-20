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
from common import codes

from .serializers import RealEstateSerializer, RealEstatePreviewResponseSerializer, RealEstateResponseSerializer
from .models import RealEstate, RealEstateImages, RealEstateChoices



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
        recs = RealEstateChoices.objects.all().values('id','key', 'value')
        return Response({'data':recs, 'status':200})


class EditRealEstateAPIView(APIView):

    serializer_class = RealEstateSerializer
    permission_classes = [IsAuthenticated, OR(IsOwner, IsAdmin)]
    authentication_classes = [JWTAuthentication]

    def put(self, req):
        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"done", 'status':200})
        return Response({"errors": serializer.errors, 'code':codes.INVALID_FIELD, 'status':400})
    #todo: user can enter same username in real estate office in edit
class GetAllRealEstatesAPIView(APIView):

    def get(self, req):
        i=0
        from random import choice
        from realtors.models import Realtor
        for realtor in Realtor.objects.all():
            for _ in range(5):
                r = RealEstate()
                r.owner = realtor
                r.city = choice(['عجب شیر', 'مراغه', 'ملکان', 'هریس', 'فیرورق'])
                r.zone = choice([1,2,3,4])
                r.main_street = choice(['پیروزی', 'بلوار ارتش', 'سعادت آباد', 'پیروزی'])
                r.sub_street = choice(['خیابان الف', 'خیابان البرز', 'خیابان سینا', 'سه راه یاسر'])
                r.deal_type = RealEstateChoices.objects.get(id=choice([7,8,9,10]))
                r.type = RealEstateChoices.objects.get(id=choice([5,6]))
                r.wc_type = RealEstateChoices.objects.get(id=choice([12,11]))
                r.cooling_system = RealEstateChoices.objects.get(id=choice([13,14]))
                r.heating_system = RealEstateChoices.objects.get(id=choice([15,16,17]))
                r.floor_meterial = RealEstateChoices.objects.get(id=choice([19, 20 ,21]))
                r.mortgage_price = choice([150_000_000, 200_000_000,100_000_000,300_000_000])
                r.rent_price = choice([10_000_000, 15_000_000,20_000_000,30_000_000])
                r.buying_price = choice([5_000_000_000, 10_000_000_000])
                if r.deal_type.id == 7:
                    r.rent_price = 0
                    r.mortgage_price = 0
                elif r.deal_type.id == 8:
                    r.buying_price = 0
                elif r.deal_type.id == 9:
                    r.buying_price = 0
                    r.rent_price = 0
                elif r.deal_type == 10:
                    r.buying_price = 0
                    r.mortgage_price = 0

                r.convertible = choice([True, False])
                r.meterage = choice([150, 200, 100, 300])
                r.number_of_rooms = choice([1,2,3,4,5])
                r.number_of_parkings = choice([1,2,3])
                r.number_of_wcs = choice([1,2,3,4])
                r.number_of_warehouses = choice([1,2])
                r.number_of_elevators = choice([1,2])
                r.floor_number = choice([0,1,2,3,4,5,6,7])
                r.total_number_of_floors = r.floor_number + choice([3,4,5,6])
                r.description = "سن بنا: نوساز\n\nموقعیت جغرافیایی بنا: شمالی\n\nنوع سند: شخصی\n\nامکانات امنیتی: آیفون تصویری، درب ضدسرقت\n\nسایر امکانات: کمد دیوری، پنجره‌ها UPVC\n\nزمان بازید ۷ صبح تا ۱۱ شب "
                if r.type.id ==6:
                    r.floor_number = 0
                    r.total_number_of_floors = choice([1,1,1,2])
                print('saving', r.city)
                r.save()

                

            if i>30:
                break

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
            return Response({"data":reo.data, 'status':200})        
        except RealEstate.DoesNotExist:
            return Response({'status':404})
        
class SearchRealEstatesAPIView(APIView):

    def get(self, req):
        pass

class UploadRealEstateImageAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
    authentication_classes = [JWTAuthentication]
    
    def post(self, req, real_estate_id):
        image = req.FILES.get('image', '')
        if image == '':
            return Response({'errors':{'image':'image not sent'}})

        if Image.open(image).format not in ('PNG', 'JPEG'):
            return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}})
        
        try:
            re = RealEstate.objects.get(id=real_estate_id, owner=req.user)
        except RealEstate.DoesNotExist:
            return Response({'errors':{'non-field-error':'real estate not found'}, 'status':404})

        file_ext = image.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'

        if RealEstateImages.objects.filter(real_estate=re).count() >= 10:
            return Response({'error':{'non-field-error':'maximum image upload limit for real estate'}, 'status':400})

        rei = RealEstateImages()
        rei.real_estate = re
        rei.image = default_storage.save(f'real_estate_offices/{file_name}', image, max_length=1*1024*1024)
        rei.image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{rei.image}'
        rei.save()

        return Response({"msg":"done", 'status':200})



