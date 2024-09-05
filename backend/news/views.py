import math

from rest_framework .views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from django.db.models import Q

from common import codes
from common.utils.permissions import IsAdmin
from common.utils import validations
from common.utils.request import get_page_and_limit
from .serializers import NewsSerializer, NewsResponseSerailizer, NewsPreviewResponseSerializer
from .models import News, Category
# Create your views here.

class SearchNewsAPIView(APIView):
    
    def get(self, req):
        """ Search for News

            two tags example: ?tag=something1&tag=something2
        """

        qp = dict(req.query_params)
        try:
            page, limit = get_page_and_limit(req)
        except ValueError as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})

        query = Q()
            

        if qp.get('tag', None):
            if type(qp['tag']) == list:
                for c in qp['tag']:
                    if c == '' or c == '"':
                        continue
                    try:
                        validations.validate_username(c)
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

        news = News.objects.filter(query)[page*limit: page*limit+limit]
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
