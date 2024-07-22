from rest_framework import serializers

from common.utils import validations
from .models import Realtor

class RealtorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Realtor
        fields = ['description', 'number', 'landline_number']

    def validate(self, attrs):

        validations.validate_se('description', attrs['description'], validations.validate_description)
        validations.validate_se('number', attrs['number'], validations.validate_number)
        validations.validate_se('landline_number', attrs['landline_number'], validations.validate_landline_number)

        return super().validate(attrs)

class RealtorResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Realtor
        fields = ['user__first_name', 'user__last_name', 'user__image_full_path', 'bg_image_full_path', 'score', 'number_of_active_ads', 'description', 'number', 'landline_number', 'real_estate_office__name', 'real_estate_office__username']



class RealtorPreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Realtor
        fields = ['id', 'user__first_name', 'user__last_name', 'user__image_full_path', 'score', 'real_estate_office__name', 'real_estate_office__username']



