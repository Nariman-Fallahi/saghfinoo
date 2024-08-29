from rest_framework import serializers

from common.utils import validations
from .models import RealEstateOffice, Comment, CommentScoreReason, Report, ReportReason

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
            'twitter',
            'email',
            'facebook',
            'whatsapp',
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
        validations.validate_se('twitter', attrs['twitter'], validations.validate_username)
        validations.validate_se('email', attrs['email'], validations.validate_username)
        validations.validate_se('telegram', attrs['telegram'], validations.validate_username)
        validations.validate_se('facebook', attrs['facebook'], validations.validate_username)
        validations.validate_se('whatsapp', attrs['whatsapp'], validations.validate_username)

        return super().validate(attrs)

class RealEstateOfficeResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = RealEstateOffice
        
    def to_representation(self, instance):
        return {
            'name':instance.name,
            'description':instance.description, 
            'username':instance.username, 
            'city':instance.city, 
            'mainStreet':instance.main_street, 
            'subStreet':instance.sub_street, 
            'number':instance.number, 
            'landlineNumber':instance.landline_number, 
            'score':instance.score, 
            'numberOfActiveAds':instance.number_of_active_ads, 
            'numberOfComments':instance.number_of_comments,
            'imageFullPath':instance.image_full_path,
            'twitter':instance.twitter,
            'whatsapp':instance.whatsapp,
            'facebook':instance.facebook,
            'telegram':instance.telegram,
            'email':instance.email,
            'blueTick':instance.blue_tick,
            'bgImageFullPath':instance.bg_image_full_path,    
        }

class RealEstateOfficePreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = RealEstateOffice

    def to_representation(self, instance):
        return {
            'name': instance.name, 
            'username': instance.username, 
            'city': instance.city, 
            'mainStreet': instance.main_street, 
            'subStreet': instance.sub_street, 
            'score': instance.score, 
            'numberOfActiveAds': instance.number_of_active_ads, 
            'numberOfComments': instance.number_of_comments,
            'imageFullPath': instance.image_full_path,
            'blueTick': instance.blue_tick,
        }




class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['score', 'description', 'score_reason']

    def validate(self, attrs):

        validations.validate_se('description', attrs['description'], validations.validate_description)
        if attrs['score'] > 5 or attrs['score'] < 0:
            raise serializers.ValidationError({'score':'score must be 0 <= score <= 5'})
        
        if attrs['score'] != round(attrs['score'], 1):
            raise serializers.ValidationError({'score': 'only one digit alowed'})

        if attrs['score_reason'].score != attrs['score']:
            raise serializers.ValidationError({'reason':'this score reason is not valid for score='+str(attrs['score'])})

        return super().validate(attrs)

class CommentResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        
        
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'owner':{
                'firstName': instance.owner.first_name,
                'lastName': instance.owner.last_name,
                'imageFullPath': instance.owner.image_full_path,
            },
            'score': instance.score, 
            'description': instance.description, 
            'score_reason': instance.score_reason.name,
        }

    


class CommentScoreReasonResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = CommentScoreReason
        fields = ['id', 'name', 'score']


class ReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = ['reason', 'description']

    def validate(self, attrs):

        validations.validate_se('description', attrs['description'], validations.validate_description)

        return super().validate(attrs)


class ReportReasonResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReportReason
        fields = ['id', 'name']