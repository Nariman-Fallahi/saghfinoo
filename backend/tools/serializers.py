from rest_framework import serializers

from .models import Province, City

class ProvinceResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Province
        fields = ['id', 'name', 'slug']

class CityResposnseSerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ['name', 'slug']