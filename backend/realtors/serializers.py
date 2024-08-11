from rest_framework import serializers

from common.utils import validations
from .models import Realtor, Comment

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


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['score', 'description']

    def validate(self, attrs):

        validations.validate_se('description', attrs['description'], validations.validate_description)
        if attrs['score'] > 5 or attrs['score'] < 0:
            raise serializers.ValidationError({'score':'score must be 0 <= score <= 5'})
        
        if attrs['score'] != round(attrs['score'], 1):
            raise serializers.ValidationError({'score': 'only one digit alowed'})

        return super().validate(attrs)

class CommentResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'owner__first_name', 'owner__last_name', 'owner__image_full_path', 'score', 'description']
