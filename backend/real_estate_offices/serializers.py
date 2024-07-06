from rest_framework import serializers

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
        ]