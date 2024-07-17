from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Province, City

class GetProvinces(APIView):

    def get(self):
        provinces = Province.objects.all()
        return Response(provinces)
    

class GetProvinceCities(APIView):

    def get(self, province_id):
        cities = City.objects.filter(province__id=province_id)
        return Response(cities)
