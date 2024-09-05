import math
import uuid

from PIL import Image
from rest_framework .views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from django.db.models import Q
from django.conf import settings
from django.core.files.storage import default_storage

from common import codes
from common.utils.permissions import IsAdmin
from common.utils import validations
from common.utils.request import get_page_and_limit
from .serializers import NewsSerializer, NewsResponseSerailizer, NewsPreviewResponseSerializer, CategoryResponseSerializer
from .models import News, Category
# Create your views here.

class SearchNewsAPIView(APIView):
    
    def get(self, req):
        """ Search for News

            two tags example: ?tag=something1&tag=something2
        """

        qp = dict(req.query_params)
        try:
            page, limit = get_page_and_limit(req, 12)
        except ValueError as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})

        query = Q()
            

        if qp.get('tag', None):
            if type(qp['tag']) == list:
                for c in qp['tag']:
                    if c == '' or c == '"':
                        continue
                    try:
                        validations.validate_name(c)
                    except ValueError as e:
                        return Response({'errors':{'tag':str(e)}, 'status':400, 'code':codes.INVALID_QUERY_PARAM})
                    
                    query |= Q(tags__contains=c)
                  

        title = req.query_params.get('title', None)
        if title:
            try:
                validations.validate_description(title)
            except ValueError as v:
                return Response({'errors':{'title': str(v)}, 'status':400, 'code':codes.INVALID_QUERY_PARAM})
            query &= Q(title__contains=title)

        category = req.query_params.get('category', None)
        if category:
            try:
                validations.validate_integer(category)
            except ValueError as v:
                return Response({'erorrs':{'category':str(v)}, 'status':400, 'code':codes.INVALID_QUERY_PARAM})
            query &= Q(category=category)

        special = req.query_params.get('special', None)
        if special:
            try:
                validations.validate_integer(special)
            except ValueError as v:
                return Response({'errors': {'special': str(v)}, 'stauts':400, 'code':codes.INVALID_QUERY_PARAM})

            query &= Q(special=special)
        
        news = News.objects.filter(query).order_by('-publish_date').order_by('-special')[page*limit: page*limit+limit]
        news = NewsPreviewResponseSerializer(news, many=True).data
        total_pages = math.ceil(News.objects.filter(query).count()/limit)
    
        return Response({'data':news, 'total_pages':total_pages, 'status':200})


class CreateGetNewsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return super().get_permissions()

    def post(self, req, slug):
        req.data['slug'] = slug
        serializer = NewsSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save(author=req.user)
            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code': codes.INVALID_FIELD})



class UploadNewsImageAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    authentication_classes = [JWTAuthentication]
    
    def post(self, req, slug):
        try:
            validations.validate_slug(slug)
        except ValueError as v:
            return Response({'errors':{"slug":str(v)}, 'status':400})


        image = req.FILES.get('image', '')
        if image == '':
            return Response({'errors':{'image':'image not sent'}})

        if Image.open(image).format not in ('PNG', 'JPEG'):
            return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}})
        
        try:
            news = News.objects.get(slug=slug)
        except News.DoesNotExist:
            return Response({'errors':{'non-field-error':'news not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})
        
        self.check_object_permissions(req, news)

        file_ext = image.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'

        if news.image:
            default_storage.delete(news.image)
        news.image = default_storage.save(f'news/{file_name}', image, max_length=1*1024*1024)
        news.image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{news.image}'
        news.save()

        return Response({"msg":"done", 'status':200})


class GetAllCategoriesAPIView(APIView):

    def get(self, req):

        categories = Category.objects.all()

        categories =CategoryResponseSerializer(categories, many=True).data

        return Response({'data': categories, 'status':200})