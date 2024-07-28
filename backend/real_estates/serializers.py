from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utils.permissions import IsAdmin, IsRealtor
from .models import RealEstate, RealEstateChoice
from common.utils import validations

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

        validations.validate_se('city', attrs['city'], validations.validate_name)
        validations.validate_se('zone', attrs['zone'], validations.validate_num)
        validations.validate_se('main_street', attrs['main_street'], validations.validate_name)
        validations.validate_se('sub_street', attrs['sub_street'], validations.validate_name)
        validations.validate_choice_se('deal_type', attrs['deal_type'], RealEstateChoice)
        validations.validate_choice_se('type', attrs['type'], RealEstateChoice)
        deal_type = RealEstateChoice.objects.get(id=attrs['deal_type'])
        if deal_type.en_value == 'buy':
            # mortgage_price and rent_price must be 0
            if attrs['mortgage_price'] != 0:
                raise serializers.ValidationError({'mortgage_price':'in buying deal type this field must be zero'})
            if attrs['rent_price'] != 0:
                raise serializers.ValidationError({'rent_price':'in buying deal type this field must be zero'})
        elif deal_type.en_value == 'rent':
            # buying_price and mortgage_price must be 0
            if attrs['buying_price'] != 0:
                raise serializers.ValidationError({'buying_price':'in rent deal type this field must be zero'})
            if attrs['mortgage_price'] != 0:
                raise serializers.ValidationError({'mortgage_price':'in rent deal type this field must be zero'})

        elif deal_type.en_value == 'rent and mortgage':
            # buying_price must be zero
            if attrs['buying_price'] != 0:
                raise serializers.ValidationError({'buying_price':'in rent and mortgage deal type this field must be zero'})

        elif deal_type.en_value == 'full mortgage':
            # buying_price and rent_price must be zero
            if attrs['buying_price'] != 0:
                raise serializers.ValidationError({'rent_price':'in full mortgage deal type this field must be zero'})
            if attrs['rent_price'] != 0:
                raise serializers.ValidationError({'rent_price':'in full mortgage deal type this field must be zero'})
            
        validations.validate_choice_se('wc_type', attrs['wc_type'], RealEstateChoice)
        validations.validate_choice_se('cooling_system', attrs['cooling_system'], RealEstateChoice)
        validations.validate_choice_se('floor_meterial', attrs['floor_meterial'], RealEstateChoice)
        validations.validate_choice_se('heating_system', attrs['heating_system'], RealEstateChoice)
        validations.validate_se('description', attrs['description'], validations.validate_description)

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
            'owner__number_of_active_ads',
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
            'type__value',
            'deal_type__value',
            'mortgage_price',
            'rent_price',
            'buying_price',
            'number_of_rooms',
            'number_of_parkings',
            'number_of_warehouses',
            'number_of_wcs',
            'wc_type__value',
            'number_of_elevators',
            'floor_number',
            'total_number_of_floors',
            'heating_system__value',
            'cooling_system__value',
            'floor_meterial__value',
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
            'deal_type__value',
            'type__value',
            'meterage',
            'city',
            'main_street',
            'mortgage_price',
            'rent_price',
            'created_at',
        ]