from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Province, City
from .serializers import ProvinceResponseSerializer, CityResposnseSerializer


class GetProvinces(APIView):

    def get(self, req):
        provinces = Province.objects.all().values(*ProvinceResponseSerializer.Meta.fields)
        return Response({'data':provinces, 'status':200})
    

class GetProvinceCities(APIView):

    def get(self, req, province_id):
        try:
            province_id = int(province_id)
        except:
            return Response({'errors':{'non-fields-error':'invalid province id in URL'}})
    
        cities = City.objects.filter(province__id=province_id).values(*CityResposnseSerializer.Meta.fields)
        return Response({'data': cities,'status':200})
