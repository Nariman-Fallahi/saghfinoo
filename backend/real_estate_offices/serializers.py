from rest_framework import serializers

from common.utils import validations
from .models import RealEstateOffice

class RealEstateOfficeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RealEstateOffice
        fields = [
            'name', 
            'description', 
            'username', 
            'city', 
            'main_street', 
            'sub_street', 
            'number', 
            'landline_number',
            'site',
            'linkedin',
            'instagram',
            'telegram',
        ]

    def validate(self, attrs):

        validations.validate_se('name', attrs['name'], validations.validate_name)
        validations.validate_se('description', attrs['description'], validations.validate_description)
        validations.validate_se('username', attrs['username'], validations.validate_username)
        validations.validate_se('city', attrs['city'], validations.validate_name)
        validations.validate_se('main_street', attrs['main_street'], validations.validate_name)
        validations.validate_se('sub_street', attrs['sub_street'], validations.validate_name)
        validations.validate_se('number', attrs['number'], validations.validate_number)
        validations.validate_se('landline_number', attrs['landline_number'], validations.validate_landline_number)
        validations.validate_se('site', attrs['site'], validations.validate_username)
        validations.validate_se('linkedin', attrs['linkedin'], validations.validate_username)
        validations.validate_se('telegram', attrs['telegram'], validations.validate_username)
        validations.validate_se('instagram', attrs['instagram'], validations.validate_username)

        return super().validate(attrs)

class RealEstateOfficeResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = RealEstateOffice
        fields = [
            'name',
            'description', 
            'username', 
            'city', 
            'main_street', 
            'sub_street', 
            'number', 
            'landline_number', 
            'score', 
            'number_of_active_ads', 
            'number_of_comments',
            'image_full_path',
            'site',
            'linkedin',
            'telegram',
            'instagram',
            'blue_tick',
            'bg_image_full_path',    
        ]

class RealEstateOfficePreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = RealEstateOffice
        fields = [
            'name', 
            'username', 
            'city', 
            'main_street', 
            'sub_street', 
            'score', 
            'number_of_active_ads', 
            'number_of_comments',
            'image_full_path',
            'blue_tick',
        ]