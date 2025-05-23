import uuid
import math

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from PIL import Image
from django.core.files.storage import default_storage
from django.conf import settings
from django.db.models import Q
from django.core.cache import caches
# import magic

from common.utils.permissions import IsAdvertisementOwner, IsAdmin, IsRealtor, IsOwner
from common.utils.request import get_page_and_limit, get_client_ip
from common import codes
from common.utils import validations

from .serializers import AdvertisementSerializer, AdvertisementPreviewResponseSerializer, AdvertisementResponseSerializer, SuggestedSearchResponseSerializer, UserSavedAdvertisementPreviewResponseSerializer, AdvertisementImageResponseSerializer, AdvertisementVideoResponseSerializer, AdvertisementChoiceResponseSerializer
from .models import Advertisement, AdvertisementImage, AdvertisementChoice, SuggestedSearch, SavedAdvertisement, AdvertisementVideo
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

ip_cache = caches['ip']

class CreateSearchAdvertisementAPIView(APIView):
    """ Create and Search
    after create, real estate office must be confirmed by admin"""

    serializer_class = AdvertisementSerializer
    permission_classes = [IsAuthenticated, IsRealtor]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):

        if self.request.method == "GET":
            return [AllowAny()]
        return super().get_permissions()

    @method_decorator(ratelimit(key='ip', method='POST', rate=settings.DEFAULT_RATE_WRITE))
    def post(self, req):
        """Create advertisement"""

        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            ad = serializer.save(owner=req.realtor)

            ad.owner.number_of_active_ads += 1
            ad.owner.asave()
            ad.owner.real_estate_office.number_of_active_ads += 1
            ad.owner.real_estate_office.asave()


            return Response({"msg": "done", 'id':ad.id, 'status':200})
        return Response({"errors": serializer.errors, 'code':codes.INVALID_FIELD, 'status':400})

    @method_decorator(ratelimit(key='ip', method='GET', rate=settings.DEFAULT_RATE_READ))
    def get(self, req):
        """Search advertisements
            valid query params: owner: int, reo_username(real estate office username): string, room: int, parking: int,
                                storage: int, restroom: int, type_of_transaction: int, elevator: int, floor: int, cooling_system: int,
                                heating_system: int, flooring: int, province: string, property_type: int, rent: int, city: string,
                                main_street: string, side_street: string, type_of_transaction: int, deposit: int, area: int, number_of_floors: int,
                                deposit_from: int, deposit_to: int, rent_from: int, rent_to: int

            equal or greater than values:
                                room: 5,
                                parking: 3,
                                storage: 3,
                                restroom: 4,
                                elevator: 3,
                                floor: 5

        """
        qp = req.query_params
        queries = {                             # query_name:validation_function
            'owner':validations.validate_integer,
            'reo_username': validations.validate_username,
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
            'property_type': validations.validate_integer,
            'rent': validations.validate_integer,
            'city':validations.validate_name,
            'province': validations.validate_name,
            'main_street': validations.validate_name,
            'side_street': validations.validate_name,
            'type_of_transaction': validations.validate_integer,
            'deposit': validations.validate_integer,
            'number_of_floors': validations.validate_integer,
            'deposit_from': validations.validate_integer,
            'deposit_to': validations.validate_integer,
            'rent_from': validations.validate_integer,
            'rent_to': validations.validate_integer,
            'area_from': validations.validate_integer,
            'area_to': validations.validate_integer,
            'type_of_transaction_name': validations.validate_name,

        }
        greater_than_exceptions = {
            'room': 5,
            'parking': 3,
            'storage': 3,
            'restroom': 4,
            'elevator': 3,
            'floor': 5,

        }

        different_fields_name = {
            'reo_username': 'owner__real_estate_office__username',
            'type_of_transaction_name': 'type_of_transaction__value',
        }

        ranged_fields_from = {
            'deposit_from':'deposit',
            'rent_from':'rent',
            'area_from': 'area',
        }

        ranged_fields_to = {
            'deposit_to':'deposit',
            'rent_to':'rent',
            'area_to': 'area',
        }

        # check query param keys is allowed
        for key in req.query_params:
            if key not in list(queries.keys()) + ['page', 'limit']:
                return Response({'errors':{key:'this key not found'}, 'status':400, 'code':codes.INVALID_QUERY_PARAM})

        try:
            page, limit = get_page_and_limit(req)
        except ValueError as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})

        kwargs = {
            "is_confirmed": True
        }

        for real_field_name, validate_func in queries.items():
            value = qp.get(real_field_name, '')
            field_name = different_fields_name.get(real_field_name, real_field_name)
            if value == '':
                continue
            try:
                validate_func(value)
            except ValueError as e:
                return Response({'errors':{field_name:str(e)}, 'code':codes.INVALID_QUERY_PARAM, 'status':400})

            ex = greater_than_exceptions.get(field_name, None)
            rg = ranged_fields_from.get(field_name, False) or ranged_fields_to.get(field_name, False)

            if ex != None and ex <= int(value):
                kwargs[f"{field_name}__gte"] = value
            elif rg:
                from_field_name = ranged_fields_from.get(field_name, None)
                if from_field_name:
                    kwargs[f'{from_field_name}__gte'] = value

                to_field_name = ranged_fields_to.get(field_name, None)
                if to_field_name:
                    kwargs[f'{to_field_name}__lte'] = value
            else:
                kwargs[field_name] = value
        if req.user.id:
            kwargs['savedadvertisement__isnull'] = True
            ads = Advertisement.objects.filter(Q(**kwargs) | (Q(**kwargs) & Q(savedadvertisement__user=req.user.id))).order_by('-created_at').values(*AdvertisementPreviewResponseSerializer.Meta.fields)[page*limit: page*limit+limit]

        else:
            ads = Advertisement.objects.filter(**kwargs).order_by('-created_at')[page*limit: page*limit+limit]

        ads = AdvertisementPreviewResponseSerializer(ads, many=True).data

        total_pages = math.ceil(Advertisement.objects.filter(**kwargs).count()/limit)

        return Response({'data':ads, 'totalPages':total_pages, 'status':200})


class GetAllAdvertisementChoicesAPIView(APIView):

    @method_decorator(ratelimit(key='ip', method='GET', rate=settings.DEFAULT_RATE_READ))
    def get(self, req):
        """Get all advertisement choices
            search by key example: ?key=property_type"""
        key = req.query_params.get('key', '')
        # validate key
        try:
            validations.validate_username(key)
        except ValueError as e:
            return Response({'errors':{'non-field-error':str(e)}})
        if key == '':
            recs = AdvertisementChoice.objects.all()
        else:
            recs = AdvertisementChoice.objects.filter(key=key)

        recs = AdvertisementChoiceResponseSerializer(recs, many=True)
        return Response({'data':recs.data, 'status':200})


class GetEditDeleteAdvertisementAPIView(APIView):
    """Edit, Delete and Get one ad"""

    serializer_class = AdvertisementSerializer
    permission_classes = [IsAuthenticated, IsAdvertisementOwner | IsAdmin]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return super().get_permissions()


    @method_decorator(ratelimit(key='ip', method='PUT', rate=settings.DEFAULT_RATE_WRITE))
    def put(self, req, advertisement_id):
        """edit one advertisemebt by id"""

        try:
            ad = Advertisement.objects.get(id=advertisement_id)
        except:
            return Response({"errors":{"non-field-error":"real estate not found"}, 'status':404})
        self.check_object_permissions(req, ad)

        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            ad.fill_from_dict(serializer.data)
            ad.save()
            return Response({"msg":"done", 'status':200})
        return Response({"errors": serializer.errors, 'code':codes.INVALID_FIELD, 'status':400})

    @method_decorator(ratelimit(key='ip', method='DELETE', rate=settings.DEFAULT_RATE_WRITE))
    def delete(self, req, advertisement_id):
        """delete one advertisement by id"""

        try:
            ad = Advertisement.objects.get(id=advertisement_id)
        except Advertisement.DoesNotExist:
            return Response({'errors':{'non-field-error':'advertisement not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})

        self.check_object_permissions(req, ad)

        # delete images and videos
        images = AdvertisementImage.objects.filter(advertisement__id=advertisement_id)
        for image in images:
            default_storage.delete(image.image)
        images.delete()

        videos = AdvertisementVideo.objects.filter(advertisement__id=advertisement_id)
        for video in videos:
            default_storage.delete(video.video)
        videos.delete()


        ad.owner.real_estate_office.number_of_active_ads -= 1
        ad.owner.real_estate_office.save()

        ad.owner.number_of_active_ads -= 1
        ad.owner.save()

        ad.delete()

        return Response({'msg':'done', 'status':200})

    @method_decorator(ratelimit(key='ip', method='GET', rate=settings.DEFAULT_RATE_READ))
    def get(self, req, advertisement_id):
        """Get one advertisement by id"""
        try:
            ad = Advertisement.objects.get(is_confirmed=True, id=advertisement_id)
            if req.user.id:
                is_saved = SavedAdvertisement.objects.filter(advertisement=ad.id, user=req.user.id)
                if len(is_saved) == 1:
                    ad.is_saved = True
                else:
                    ad.is_saved = False


            # if ip not exists in cache
            if not ip_cache.get(get_client_ip(req), None):

                # add ip to cache
                ip_cache.add(get_client_ip(req), 'saved')
                ad.number_of_views += 1
                ad.save()


            ad = AdvertisementResponseSerializer(ad).data

            ad['images'] = AdvertisementImageResponseSerializer(AdvertisementImage.objects.filter(advertisement=ad['id']), many=True).data
            ad['videos'] = AdvertisementVideoResponseSerializer(AdvertisementVideo.objects.filter(advertisement=ad['id']), many=True).data

        except Advertisement.DoesNotExist:
            return Response({'status':404, 'code':codes.OBJ_NOT_FOUND})

        return Response({"data":ad, 'status':200})

class GetAllRealtorAdvertisementsAPIView(APIView):
    """get a realtor ads. confirmed or not confirmed"""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsRealtor]

    @method_decorator(ratelimit(key='ip', method='GET', rate=settings.DEFAULT_RATE_READ))
    def get(self, req):

        try:
            page, limit = get_page_and_limit(req)
        except ValueError as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})

        ads = Advertisement.objects.filter(owner=req.realtor.id)[page*limit:page*limit+limit]
        ads = AdvertisementPreviewResponseSerializer(ads, many=True)

        total_pages = math.ceil(Advertisement.objects.filter(owner=req.realtor.id).count()/limit)


        return Response({'data':ads.data, 'totalPages': total_pages, 'status':200})


class GetRealtorAdvertisementAPIView(APIView):
    """get a realtor ad by id. confrimed or not confirmed"""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsRealtor, IsAdvertisementOwner]

    @method_decorator(ratelimit(key='ip', method='GET', rate=settings.DEFAULT_RATE_READ))
    def get(self, req, advertisement_id):
        try:
            ad = Advertisement.objects.get(id=advertisement_id)
            self.check_object_permissions(req, ad)
            ad = AdvertisementResponseSerializer(ad).data
            ad['images'] = AdvertisementImageResponseSerializer(AdvertisementImage.objects.filter(advertisement=ad['id']), many=True).data
            ad['videos'] = AdvertisementVideoResponseSerializer(AdvertisementVideo.objects.filter(advertisement=ad['id']), many=True).data

        except Advertisement.DoesNotExist:
            return Response({'status':404, 'errors':{'non-field-error': 'advertisement not found'}, 'code':codes.OBJ_NOT_FOUND})

        return Response({"data":ad, 'status':200})

class UploadAdvertisementImageAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdvertisementOwner]
    authentication_classes = [JWTAuthentication]

    @method_decorator(ratelimit(key='ip', method='POST', rate=settings.DEFAULT_RATE_WRITE))
    def post(self, req, advertisement_id):
        """upload advertisement image.
            input: "form-data" with "image" field"""
        image = req.FILES.get('image', '')
        if image == '':
            return Response({'errors':{'image':'image not sent'}})

        if Image.open(image).format not in ('PNG', 'JPEG'):
            return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}, 'status':400, 'code':codes.INVALID_FILE_FORMAT})

        try:
            re = Advertisement.objects.get(id=advertisement_id)
        except Advertisement.DoesNotExist:
            return Response({'errors':{'non-field-error':'real estate not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})

        self.check_object_permissions(req, re)

        file_ext = image.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'

        if AdvertisementImage.objects.filter(advertisement=re).count() + AdvertisementVideo.objects.filter(advertisement=re).count() >= settings.ADVERTISEMENT_MEDIA_LIMIT:
            return Response({'error':{'non-field-error':'maximum image and video upload limit'}, 'status':400, 'code':codes.MAX_LIMIT_EXCEEDED})


        rei = AdvertisementImage()
        rei.advertisement = re
        rei.image = default_storage.save(f'advertisements/{file_name}', image, max_length=1*1024*1024)
        rei.image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{rei.image}'
        rei.save()

        if re.image_full_path == '':
            re.image_full_path = rei.image_full_path
            re.save()

        return Response({"msg":"done", 'status':200})


class DeleteAdvertisementUploadedImageAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
    authentication_classes = [ JWTAuthentication]

    @method_decorator(ratelimit(key='ip', method='DELETE', rate=settings.DEFAULT_RATE_WRITE))
    def delete(self, req, image_id):
        """delete advertisement image by image id"""
        try:
            image = AdvertisementImage.objects.get(id=image_id)
        except AdvertisementImage.DoesNotExist:
            return Response({'errors':{"non-field-error":'image not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})

        self.check_object_permissions(req, image.advertisement)

        default_storage.delete(image.image)

        return Response({'msg':'done', 'status':200})


class SetAdvertisementPrimaryImageAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdvertisementOwner | IsAdmin]
    authentication_classes = [JWTAuthentication]

    @method_decorator(ratelimit(key='ip', method='POST', rate=settings.DEFAULT_RATE_WRITE))
    def post(self, req, advertisement_id, image_id):
        try:
            ad = Advertisement.objects.get(id=advertisement_id)
            image = AdvertisementImage.objects.get(id=image_id)
        except Advertisement.DoesNotExist:
            return Response({'errors':{'non-field-error':'advertisement not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})
        except AdvertisementImage.DoesNotExist:
            return Response({'errors':{"non-field-error":'image not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})

        self.check_object_permissions(req, ad)

        if image.advertisement != ad:
            return Response({'errors':{'image':'this image is not for this advertisement'}})

        ad.image_full_path = image.image_full_path
        ad.save()

        return Response({'msg':'done', 'status':200})





class DeleteAllRealtorAdvertisementsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsRealtor]
    authentication_classes = [JWTAuthentication]

    @method_decorator(ratelimit(key='ip', method='DELETE', rate=settings.DEFAULT_RATE_WRITE))
    def delete(self, req):
        """delete all realtor advertisements"""
        images = AdvertisementImage.objects.filter(advertisement__owner=req.realtor.id)
        for image in images:
            default_storage.delete(image.image)
        images.delete()
        videos = AdvertisementVideo.objects.filter(advertisement__owner=req.realtor.id)
        for video in videos:
            default_storage.delete(video.video)
        videos.delete()

        Advertisement.objects.filter(owner=req.realtor.id).delete()

        req.realtor.real_estate_office.number_of_active_ads -= req.realtor.number_of_active_ads
        req.realtor.real_estate_office.save()

        req.realtor.number_of_active_ads = 0
        req.realtor.save()

        return Response({'msg':'done', 'status':200})


class UploadAdvertisementVideoAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdvertisementOwner]
    authentication_classes = [JWTAuthentication]

    @method_decorator(ratelimit(key='ip', method='POST', rate=settings.DEFAULT_RATE_WRITE))
    def post(self, req, advertisement_id):
        """upload video for advertisement
            input: "form-data" with "video" field"""

        video = req.FILES.get('video', None)
        if not video:
            return Response({'errors':{'video':'video field not found'}, 'status':400})

        try:
            re = Advertisement.objects.get(id=advertisement_id)
        except Advertisement.DoesNotExist:
            return Response({'errors':{'non-field-error':'real estate not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})

        self.check_object_permissions(req, re)

        file_ext = video.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'


        if AdvertisementImage.objects.filter(advertisement=re).count() + AdvertisementVideo.objects.filter(advertisement=re).count() >= settings.ADVERTISEMENT_MEDIA_LIMIT:
            return Response({'errors':{'non-field-error':'maximum image and video upload limit'}, 'status':400, 'code':codes.MAX_LIMIT_EXCEEDED})


        rev = AdvertisementVideo()
        rev.advertisement = re
        rev.video = default_storage.save(f'advertisements/{file_name}', video, max_length=50*1024*1024)
        rev.video_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{rev.video}'
        rev.save()

        return Response({"msg":"done", 'status':200})


class DeleteAdvertisementVideoAPIView(APIView):
    pass



####################################     saved advertisements      ###################################################

class SaveUnsaveAdvertisementAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @method_decorator(ratelimit(key='ip', method='POST', rate=settings.DEFAULT_RATE_WRITE))
    def post(self, req, advertisement_id):
        """save advertisement"""
        # check is ad exist
        try:
            ad = Advertisement.objects.get(id=advertisement_id, is_confirmed=True)
        except Advertisement.DoesNotExist:
            return Response({'errors':{'non-field-error': 'advertisement not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})

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

    @method_decorator(ratelimit(key='ip', method='DELETE', rate=settings.DEFAULT_RATE_WRITE))
    def delete(self, req, advertisement_id):
        """unsave advertisement"""
        try:
            sad = SavedAdvertisement.objects.get(advertisement=advertisement_id, user=req.user.id)
        except SavedAdvertisement.DoesNotExist:
            return Response({'errors':{'non-field-error':'this advertisement not saved'}, 'code':codes.AD_NOT_SAVED, 'status':400})

        sad.delete()
        return Response({'msg':'done', 'status':200})




class GetUserSavedAdvertisementAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @method_decorator(ratelimit(key='ip', method='GET', rate=settings.DEFAULT_RATE_READ))
    def get(self, req):
        """get saved advertisements"""
        try:
            page, limit = get_page_and_limit(req)
        except ValueError as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})

        ads = SavedAdvertisement.objects.filter(user=req.user.id)[page*limit:page*limit+limit]
        ads = UserSavedAdvertisementPreviewResponseSerializer(ads, many=True).data

        total_pages = math.ceil(SavedAdvertisement.objects.filter(user=req.user.id).count()/limit)

        return Response({'data':ads, 'totalPages':total_pages, 'status':200})

    @method_decorator(ratelimit(key='ip', method='DELETE', rate=settings.DEFAULT_RATE_WRITE))
    def delete(self, req):
        """delete all user saved advertisements"""
        SavedAdvertisement.objects.filter(user=req.user.id).delete()

        return Response({"msg":"done", 'status':200})


##################### suggested searchs  #######################

class GetAllSuggestedSearchsAPIView(APIView):

    @method_decorator(ratelimit(key='ip', method='GET', rate=settings.DEFAULT_RATE_READ))
    def get(self, req):

        cs = SuggestedSearch.objects.all().order_by('-priority')[:settings.SUGGESTED_SEARCH_LIMIT]
        cs = SuggestedSearchResponseSerializer(cs, many=True).data

        return Response({'data':cs, 'status':200})
