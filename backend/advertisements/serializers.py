from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utils.permissions import IsAdmin, IsRealtor
from .models import Advertisement, AdvertisementImage
from common.utils import validations

class AdvertisementSerializer(serializers.ModelSerializer):



    class Meta:
        model = Advertisement
        fields = [
            'city',
            'province',
            'main_street',
            'side_street',
            'type_of_transaction',
            'property_type',
            'deposit',
            'rent',
            'convertible',
            'area',
            'room',
            'floor',
            'number_of_floors',
            'parking',
            'restroom',
            'type_of_restroom',
            'storage',
            'elevator',
            'flooring',
            'cooling_system',
            'heating_system',
            'description',
        ]

    def validate(self, attrs): # todo

        validations.validate_se('city', attrs['city'], validations.validate_name)
        validations.validate_se('main_street', attrs['main_street'], validations.validate_name)
        validations.validate_se('side_street', attrs['side_street'], validations.validate_name)
        validations.validate_choice_se('type_of_transaction', attrs['type_of_transaction'])
        validations.validate_choice_se('property_type', attrs['property_type'])
        type_of_transaction = attrs['type_of_transaction']
        
        if type_of_transaction.en_value == 'rent':
            # desposit must be 0
            if attrs['deposit'] != 0:
                raise serializers.ValidationError({'deposit':'in rent transaction, this field must be zero'})
            if attrs['rent'] == 0:
                raise serializers.ValidationError({'rent':'in rent and desposit transaction, this field cannot be zero'})


        elif type_of_transaction.en_value == 'rent and deposit':
            
            if attrs['rent'] == 0:
                raise serializers.ValidationError({'rent':'in rent and deposit transaction, this field cannot be zero'})
            if attrs['deposit'] == 0:
                raise serializers.ValidationError({'deposit':'in rent and deposit transaction, this field cannot be zero'})

        elif type_of_transaction.en_value == 'full deposit':
            # buying_price and rent_price must be zero
            if attrs['rent'] != 0:
                raise serializers.ValidationError({'rent':'in full deposit transaction, this field must be zero'})
            if attrs['diposit'] == 0:
                raise serializers.ValidationError({'deposit':'in full deposit transaction, this field cannot be zero'})

        else:
            raise ValueError('type_of_transaction is set incurrectlly')
            
        validations.validate_choice_se('type_of_restroom', attrs['type_of_restroom'])
        validations.validate_choice_se('cooling_system', attrs['cooling_system'])
        validations.validate_choice_se('flooring', attrs['flooring'])
        validations.validate_choice_se('heating_system', attrs['heating_system'])
        validations.validate_se('description', attrs['description'], validations.validate_description)

        return super().validate(attrs)


class AdvertisementResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement
        fields = [
            'id',
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
            'side_street',
            'province',
            'area',
            'property_type__value',
            'type_of_transaction__value',
            'deposit',
            'rent',
            'room',
            'parking',
            'storage',
            'restroom',
            'type_of_restroom__value',
            'elevator',
            'floor',
            'number_of_floors',
            'heating_system__value',
            'cooling_system__value',
            'flooring__value',
            'description',
            'map_position',
            'number_of_views',
            'number_of_saves',
            'convertible',
        ]

class AdvertisementPreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement
        fields = [
            'id',
            'image_full_path',
            'type_of_transaction__value',
            'property_type__value',
            'area',
            'city',
            'main_street',
            'deposit',
            'rent',
            'created_at',
        ]

class RealtorAdvertisementPreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement
        fields = AdvertisementPreviewResponseSerializer.Meta.fields + ['is_confirmed']



class RealtorAdvertisementResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement
        fields = AdvertisementResponseSerializer.Meta.fields + ['is_confirmed']



class UserSavedAdvertisementPreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement
        fields = [
            'advertisement__id',
            'advertisement__image_full_path',
            'advertisement__type_of_transaction__value',
            'advertisement__property_type__value',
            'advertisement__area',
            'advertisement__city',
            'advertisement__main_street',
            'advertisement__side_street',
            'advertisement__deposit',
            'advertisement__rent',
            'advertisement__created_at',
        ]


class AdvertisementImageResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdvertisementImage
        fields = ['id', 'image_full_path']



class AdvertisementVideoResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdvertisementImage
        fields = ['id', 'video_full_path']
