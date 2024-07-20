from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utils.permissions import IsAdmin, IsRealtor
from .models import RealEstate

class RealEstateSerializer(serializers.ModelSerializer):



    class Meta:
        model = RealEstate
        fields = [
            'city',
            'zone',
            'main_street',
            'sub_street',
            'deal_type',
            'type',
            'mortgage_price',
            'rent_price',
            'buying_price',
            'convertible',
            'meterage',
            'number_of_rooms',
            'floor_number',
            'total_number_of_floors',
            'number_of_parkings',
            'number_of_wcs',
            'number_of_warehouses',
            'wc_type',
            'number_of_elevators',
            'cooling_system',
            'floor_meterial',
            'heating_system',
            'description',
        ]

    def validate(self, attrs): # todo
        return super().validate(attrs)


class RealEstateResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = RealEstate
        fields = [
            # images
            'owner__user__first_name',
            'owner__user__last_name',
            'owner__user__image_full_path',
            'owner__score',
            'owner__number_of_actice_ads',
            'owner__real_estate_office__username',
            'owner__real_estate_office__name',
            'owner__real_estate_office__image_full_path',
            'created_at',
            'modified_at',
            'city',
            'main_street',
            'sub_street',
            'zone',
            'meterage',
            'type',
            'deal_type',
            'mortgage_price',
            'rent_price',
            'buying_price',
            'number_of_rooms',
            'number_of_parkings',
            'number_of_warehouses',
            'number_of_wcs',
            'wc_type',
            'number_of_elevators',
            'floor_number',
            'total_number_of_floor',
            'heating_system',
            'cooling_system',
            'floor_meterial',
            'description',
            'map_position',
            'number_of_views',
            'number_of_saves',
            'convertible',
        ]

class RealEstatePreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = RealEstate
        fields = [
            # image
            'deal_type',
            'type',
            'meterage',
            'city',
            'main_street',
            'mortgage_price',
            'rent_price',
            'created_at',
        ]