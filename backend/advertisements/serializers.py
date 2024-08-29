from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utils.permissions import IsAdmin, IsRealtor
from .models import Advertisement, AdvertisementImage, AdvertisementChoice
from common.utils import validations
from realtors.models import Realtor
from users.models import CustomUser
from real_estate_offices.models import RealEstateOffice


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
            if attrs['deposit'] == 0:
                raise serializers.ValidationError({'deposit':'in full deposit transaction, this field cannot be zero'})

        else:
            raise ValueError('type_of_transaction is set incurrectlly')
            
        validations.validate_choice_se('type_of_restroom', attrs['type_of_restroom'])
        validations.validate_choice_se('cooling_system', attrs['cooling_system'])
        validations.validate_choice_se('flooring', attrs['flooring'])
        validations.validate_choice_se('heating_system', attrs['heating_system'])
        validations.validate_se('description', attrs['description'], validations.validate_description)

        return super().validate(attrs)



class UserSavedAdvertisementPreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement

    def to_representation(self, instance):
        return {
            'id':instance.advertisement.id,
            'imageFullPath':instance.advertisement.image_full_path,
            'typeOfTransaction':instance.advertisement.type_of_transaction.value,
            'propertyType':instance.advertisement.property_type.value,
            'area': instance.advertisement.area,
            'city': instance.advertisement.city,
            'mainStreet': instance.advertisement.main_street,
            'side_street': instance.advertisement.side_street,
            'deposit': instance.advertisement.deposit,
            'rent': instance.advertisement.rent,
            'createdAt': instance.advertisement.created_at,
        }

class AdvertisementImageResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdvertisementImage

    def to_representation(self, instance):
        return {'id':instance.id, 'imageFullPath':instance.image_full_path}

class AdvertisementVideoResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdvertisementImage

    def to_representation(self, instance):
        return {'id':instance.id, 'videoFullPath':instance.video_full_path}    

class AdvertisementChoiceResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvertisementChoice
        fields = ['id', 'key', 'value']


class AdvertisementResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement
        fields = [
            
        ]

    def to_representation(self, instance):
        return {
            'owner':{
                'score':instance.owner.score, 
                'numberOfActiveAds': instance.owner.number_of_active_ads,
                'user': {
                    'firstName':instance.owner.user.first_name, 
                    'lastName':instance.owner.user.last_name, 
                    'imageFullPath':instance.owner.user.image_full_path
                },
                'realEstateOffice':{
                    'username': instance.owner.real_estate_office.username,
                    'name': instance.owner.real_estate_office.name,
                    'imageFullPath': instance.owner.real_estate_office.image_full_path,
                },
            },

            'id': instance.id,
            'createdAt': instance.created_at,
            'modifiedAt': instance.modified_at,
            'city': instance.city,
            'mainStreet': instance.main_street,
            'sideStreet': instance.side_street,
            'province': instance.province,
            'area': instance.area,
            'propertyType':instance.property_type.value,
            'typeOfTransaction': instance.type_of_transaction.value,
            'deposit': instance.deposit,
            'rent': instance.rent,
            'room':instance.room,
            'parking':instance.parking,
            'storage':instance.storage,
            'restroom':instance.restroom,
            'typeOfRestroom': instance.type_of_restroom.value,
            'elevator': instance.elevator,
            'floor':instance.floor,
            'numberOfFloors': instance.number_of_floors,
            'heatingSystem':instance.heating_system.value,
            'coolingsystem':instance.cooling_system.value,
            'flooring': instance.flooring.value,
            'description':instance.description,
            'mapPosition':instance.map_position,
            'numberOfViews':instance.number_of_views,
            'numberOfSaves':instance.number_of_saves,
            'convertible':instance.convertible,
        }

class AdvertisementPreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement

    def to_representation(self, instance):
        return {
            'id':instance.id,
            'imageFullPath':instance.image_full_path,
            'typeOfTransaction':instance.type_of_transaction.value,
            'propertyType':instance.property_type.value,
            'area': instance.area,
            'city': instance.city,
            'mainStreet': instance.main_street,
            'sideStreet': instance.side_street,
            'deposit': instance.deposit,
            'rent': instance.rent,
            'createdAt': instance.created_at,
        }

class RealtorAdvertisementPreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement

    def to_representation(self, instance):
        data = AdvertisementResponseSerializer().to_representation(instance)
        data['is_confirmed'] = instance.is_confirmed
        return data

class RealtorAdvertisementResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement

    def to_representation(self, instance):
        data = AdvertisementPreviewResponseSerializer().to_representation(instance)
        data['is_confirmed'] = instance.is_confirmed
        return data