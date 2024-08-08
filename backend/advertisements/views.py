import uuid

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, OR
from rest_framework_simplejwt.authentication import JWTAuthentication
from PIL import Image
from django.core.files.storage import default_storage
from django.conf import settings

from common.utils.permissions import IsAdvertisementOwner, IsAdmin, IsRealtor
from common.utils.request import get_page_and_limit
from common import codes
from common.utils import validations

from .serializers import AdvertisementSerializer, AdvertisementPreviewResponseSerializer, AdvertisementResponseSerializer, RealtorAdvertisementPreviewResponseSerializer, RealtorAdvertisementResponseSerializer, UserSavedAdvertisementPreviewResponseSerializer
from .models import Advertisement, AdvertisementImage, AdvertisementChoice, SavedAdvertisement



class CreateAdvertisementAPIView(APIView):
    """after create, real estate office must be confirmed by admin"""

    serializer_class = AdvertisementSerializer
    permission_classes = [IsAuthenticated, IsRealtor]
    authentication_classes = [JWTAuthentication]

    def post(self, req):
        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            ad = serializer.save(owner=req.realtor)
            return Response({"msg": "done", 'id':ad.id, 'status':200})
        return Response({"errors": serializer.errors, 'code':codes.INVALID_FIELD, 'status':400})
    

    def get(self, req):
        key = req.query_params.get('key', '')
        # validate key
        try:
            validations.validate_username(key)
        except ValueError as e:
            return Response({'errors':{'non-field-error':str(e)}})
        if key == '':
            recs = AdvertisementChoice.objects.all().values('id','key', 'value')
        else:
            recs = AdvertisementChoice.objects.filter(key=key).values('id', 'key', 'value')
        return Response({'data':recs, 'status':200})


class EditAdvertisementAPIView(APIView):

    serializer_class = AdvertisementSerializer
    permission_classes = [IsAuthenticated, IsAdvertisementOwner | IsAdmin]
    authentication_classes = [JWTAuthentication]

    def put(self, req, advertisement_id):
        try:
            ad = Advertisement.objects.get(id=advertisement_id)
        except:
            return Response({"errors":{"non-field-error":"real estate not found"}, 'status':404})
        self.check_object_permissions(req, ad)

        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            serializer.save(id=advertisement_id)
            return Response({"msg":"done", 'status':200})
        return Response({"errors": serializer.errors, 'code':codes.INVALID_FIELD, 'status':400})
    #todo: user can enter same username in real estate office in edit
class GetAllAdvertisementsAPIView(APIView):

    def get(self, req):
        try:
            page, limit = get_page_and_limit(req)
        except Exception as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})
        
        reo = Advertisement.objects.filter(is_confirmed=True).values(*AdvertisementPreviewResponseSerializer.Meta.fields)[page*limit:page*limit+limit]
        
        return Response({'data':reo, 'status':200})
    
class GetAdvertisementAPIView(APIView):
    """get real estate office by id"""
    def get(self, req, advertisement_id):
        try:
            reo = Advertisement.objects.values(*AdvertisementResponseSerializer.Meta.fields).get(is_confirmed=True, id=advertisement_id)
            reo['images'] = AdvertisementImage.objects.filter(advertisement=reo['id']).values('image_full_path', 'id')
            
            return Response({"data":reo, 'status':200})        
        except Advertisement.DoesNotExist:
            return Response({'status':404})

class SearchAdvertisementsAPIView(APIView):

    def get(self, req):
        qp = req.query_params
        queries = {                             # query_name:validation_function
            'owner':validations.validate_integer,
            'room': validations.validate_integer,
            'parking': validations.validate_integer,
            'storage': validations.validate_integer,
            'restroom': validations.validate_integer,
            'type_of_restroom': validations.validate_integer,
            'elevator': validations.validate_integer,
            'floor': validations.validate_integer,
            'cooling_system': validations.validate_integer,
            'heating_system': validations.validate_integer,
            'flooring': validations.validate_integer,
            'province': validations.validate_name,
            'property_type': validations.validate_integer,
            'rent': validations.validate_integer,
            'city':validations.validate_name,
            'main_street': validations.validate_name,
            'side_street': validations.validate_name,
            'type_of_transaction': validations.validate_integer,
            'desposit': validations.validate_integer,
            'area': validations.validate_integer,
            'number_of_floors': validations.validate_integer,
        }
        greater_than_exceptions = {
            'room': 5,
            'parking': 3,
            'storage': 3,
            'restroom': 4,
            'elevator': 3,
            'floor': 5,

        } 

        try:
            page, limit = get_page_and_limit(req)
        except Exception as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})

        kwargs = {
            "is_confirmed": True
        }

        for field_name, validate_func in queries.items():
            value = qp.get(field_name, '')
            if value == '':
                continue
            try:
                validate_func(value)
            except ValueError as e:
                return Response({'errors':{field_name:str(e)}, 'code':codes.INVALID_QUERY_PARAM, 'status':400})
            
            ex = greater_than_exceptions.get(field_name, None)
            if ex != None and ex <= int(value):
                kwargs[f"{field_name}__gte"] = value
            else:
                kwargs[field_name] = value

        ads = Advertisement.objects.values(*AdvertisementPreviewResponseSerializer.Meta.fields).filter(**kwargs)[page*limit: page*limit+limit]

        return Response({'data':ads, 'status':200})

class GetAllRealtorAdvertisementsAPIView(APIView):
    """get a realtor ads. confirmed or not confirmed"""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsRealtor]

    def get(self, req):
        try:
            page, limit = get_page_and_limit(req)
        except Exception as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})
        
        reo = Advertisement.objects.filter(owner=req.realtor.id).values(*RealtorAdvertisementPreviewResponseSerializer.Meta.fields)[page*limit:page*limit+limit]
        
        return Response({'data':reo, 'status':200})
    

class GetRealtorAdvertisementAPIView(APIView):
    """get a realtor ad. confrimed or not confirmed"""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsRealtor]

    def get(self, req, advertisement_id):
        try:
            reo = Advertisement.objects.values(*RealtorAdvertisementResponseSerializer.Meta.fields).get(id=advertisement_id, owner=req.realtor.id)
            reo['images'] = AdvertisementImage.objects.filter(advertisement=reo['id']).values('image_full_path', 'id')
            
            return Response({"data":reo, 'status':200})
        except Advertisement.DoesNotExist:
            return Response({'status':404, 'errors':{'non-field-error': 'advertisement not found or you not owner of it'}})


class UploadAdvertisementImageAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def post(self, req, advertisement_id):
        image = req.FILES.get('image', '')
        if image == '':
            return Response({'errors':{'image':'image not sent'}})

        if Image.open(image).format not in ('PNG', 'JPEG'):
            return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}})
    
        try:
            re = Advertisement.objects.get(id=advertisement_id, owner__user=req.user)
        except Advertisement.DoesNotExist:
            return Response({'errors':{'non-field-error':'real estate not found or you not owner of that real estate'}, 'status':404})

        file_ext = image.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'

        if AdvertisementImage.objects.filter(advertisement=re).count() >= 10:
            return Response({'error':{'non-field-error':'maximum image upload limit for real estate'}, 'status':400})


        rei = AdvertisementImage()
        rei.advertisement = re
        rei.image = default_storage.save(f'real_estate_offices/{file_name}', image, max_length=1*1024*1024)
        rei.image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{rei.image}'
        rei.save()

        if re.image_full_path == '':
            re.image_full_path = rei.image_full_path
            re.save()

        return Response({"msg":"done", 'status':200})



class DeleteAllRealtorAdvertisementsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsRealtor]
    authentication_classes = [JWTAuthentication]

    def delete(self, req):
        Advertisement.objects.delete(realtor=req.realtor.id)
        return Response({'msg':'done', 'status':200})
    

class DeleteAdvertisementAPIView(APIView):
    permission_classes = [IsAuthenticated, IsRealtor, IsAdvertisementOwner]
    authentication_classes = [JWTAuthentication]

    def delete(self, req, advertisement_id):
        try:
            ad = Advertisement.objects.get(id=advertisement_id)
        except Advertisement.DoesNotExist:
            return Response({'errors':{'non-field-error':'advertisement not found'}, 'status':404})

        self.check_object_permissions(req, ad)

        ad.delete()
        return Response({'msg':'done', 'status':200})
    

####################################     saved advertisements      ###################################################

class SaveAdvertisementAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, req, advertisement_id):
        # check is ad exist
        try:
            ad = Advertisement.objects.get(id=advertisement_id, is_confirmed=True)
        except Advertisement.DoesNotExist:
            return Response({'errors':{'non-field-error': 'advertisement not found'}, 'status':404})

        # check ad is already saved
        try:
            SavedAdvertisement.objects.get(advertisement=advertisement_id, user=req.user.id)
            return Response({'errors':{'non-field-error':'advertisement is already saved'}, 'code':codes.AD_ALREADY_SAVED, 'status':400})
        except SavedAdvertisement.DoesNotExist:
            pass
        
        sad = SavedAdvertisement()
        sad.advertisement = ad
        sad.user = req.user
        sad.save()

        return Response({'msg':'done', 'status':200})
    

class GetUserSavedAdvertisementAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, req):
        try:
            page, limit = get_page_and_limit(req)
        except Exception as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})
        
        ads = SavedAdvertisement.objects.filter(user=req.user.id).values(*UserSavedAdvertisementPreviewResponseSerializer.Meta.fields)[page*limit:page*limit+limit]

        # remove advertisement__ from the keys
        ads = list(ads)
        for i in range(len(ads)):
            for key in ads[i].keys():
                new_key = key[len('advertisement__'):]
                ads[i][new_key] = ads[i].pop(key)
            
        return Response({'data':ads, 'status':200})


class DeleteSavedAdvertisementAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def delete(self, req, advertisement_id):
        try:
            sad = SavedAdvertisement.objects.get(advertisement=advertisement_id, user=req.user.id)
        except SavedAdvertisement.DoesNotExist:
            return Response({'errors':{'non-field-error':'this advertisement not saved'}, 'code':codes.AD_NOT_SAVED, 'status':400})
        
        sad.delete()
        return Response({'msg':'done', 'status':200})