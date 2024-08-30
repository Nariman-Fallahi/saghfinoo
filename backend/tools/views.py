from rest_framework.response import Response
from rest_framework.views import APIView

from common.utils import validations
from common import codes
from .models import Province, City
from .serializers import ProvinceResponseSerializer, CityResposnseSerializer


class GetProvincesAPIView(APIView):

    def get(self, req):
        """Get all provinces"""
        provinces = Province.objects.all().values(*ProvinceResponseSerializer.Meta.fields)
        return Response({'data':provinces, 'status':200})
    

class GetProvinceCitiesAPIView(APIView):

    def get(self, req, province_id):
        """Get province cities"""
        try:
            province_id = int(province_id)
        except:
            return Response({'errors':{'non-fields-error':'invalid province id in URL'}})
    
        cities = City.objects.filter(province__id=province_id).values(*CityResposnseSerializer.Meta.fields)
        return Response({'data': cities,'status':200})

class SearchCitiesAPIVew(APIView):

    def get(self, req):
        """search cities
        
            example: ?name=test"""
        
        city = req.query_params.get('name', None)
        if city:
            try:
                validations.validate_name(city)
            except ValueError as v:
                return Response({'errors':{'city':str(v)}, 'status':400, 'code':codes.INVALID_QUERY_PARAM})

            cities = City.objects.filter(name__contains=city).values(*CityResposnseSerializer.Meta.fields)
        else:
            cities = City.objects.all().values(*CityResposnseSerializer.Meta.fields)

        return Response({'data': cities,'status':200})
