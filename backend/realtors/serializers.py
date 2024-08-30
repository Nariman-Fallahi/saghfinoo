from rest_framework import serializers

from common.utils import validations
from .models import Realtor, Comment, CommentScoreReason, Report, ReportReason

class RealtorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Realtor
        fields = [
            'description', 
            'number', 
            'landline_number',
            'telegram',
            'whatsapp',
            'twitter',
            'facebook',
            'email',
        ]

    def validate(self, attrs):

        validations.validate_se('description', attrs['description'], validations.validate_description)
        validations.validate_se('number', attrs['number'], validations.validate_number)
        validations.validate_se('landline_number', attrs['landline_number'], validations.validate_landline_number)
        validations.validate_se('telegram', attrs['telegram'], validations.validate_username)
        validations.validate_se('whatsapp', attrs['whatsapp'], validations.validate_username)
        validations.validate_se('twitter', attrs['twitter'], validations.validate_username)
        validations.validate_se('facebook', attrs['facebook'], validations.validate_username)

        return super().validate(attrs)

    def to_internal_value(self, data):
        data['landline_number'] = data.get('landlineNumber', None)
        return super().to_internal_value(data)

class RealtorResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Realtor
      

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'user':{
                'firstName': instance.user.first_name,
                'lastName': instance.user.last_name,
                'imageFullPath': instance.user.image_full_path,
            },
            'bgImageFullPath': instance.bg_image_full_path,
            'score': instance.score,
            'numberOfActiveAds':instance.number_of_active_ads,
            'description': instance.description,
            'number': instance.number,
            'landlineNumber': instance.landline_number,
            'telegram': instance.telegram,
            'whatsapp': instance.whatsapp,
            'twitter': instance.twitter,
            'facebook': instance.facebook,
            'email': instance.email,
            'blueTick': instance.blue_tick,
            'realEstateOffice': {
                'name': instance.real_estate_office.name,
                'username': instance.real_estate_office.username,
            },
        }



class RealtorPreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Realtor

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'user':{
                'firstName': instance.user.first_name,
                'lastName': instance.user.last_name,
                'imageFullPath': instance.user.image_full_path,
            },
            'score': instance.score,
            'blueTick': instance.blue_tick,
            'realEstateOffice': {
                'name': instance.real_estate_office.name,
                'username': instance.real_estate_office.username,
            },
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
            raise serializers.ValidationError({'score_reason':'this score reason is not valid for score='+str(attrs['score'])})


        return super().validate(attrs)

    def to_internal_value(self, data):
        data = {
            'score': data.get('score', None),
            'description': data.get('description', None),
            'score_reason': data.get('scoreReason', None)
        }
        return super().to_internal_value(data)


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
            'scoreReason': instance.score_reason.name,
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