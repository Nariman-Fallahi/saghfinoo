from typing import Any, Dict
from .models import CustomUser
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from common.utils import validations
from common import codes

class VerifyNumberSerializer(serializers.Serializer):
    code = serializers.IntegerField()
    number = serializers.CharField(max_length=11)
    token = serializers.CharField(max_length=512, allow_blank=True)

    def validate(self, attrs):

        validations.validate_se('number', attrs['number'], validations.validate_number)
        

        if "'" in attrs.get('token'):
            raise serializers.ValidationError({'token': "invalid token c"})

        return super().validate(attrs)


class SignupSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=512)
    class Meta:
        model = CustomUser
        fields = ['number', 'first_name', 'last_name', 'password', 'token']

    def validate(self, attrs):

        validations.validate_se('number', attrs['number'], validations.validate_number)
        validations.validate_se('first_name', attrs['first_name'], validations.validate_name)
        validations.validate_se('last_name', attrs['last_name'], validations.validate_name)


        if "'" in attrs.get('token'):
            raise serializers.ValidationError({'token': "invalid token c"})


        return super().validate(attrs)
    

    def to_internal_value(self, data):
        data['first_name'] = data.get('firstName', None)
        data['last_name'] = data.get('lastName', None)
        return super().to_internal_value(data)


class SigninSerializer(serializers.Serializer):
    number = serializers.CharField(max_length=11)
    password = serializers.CharField(max_length=512)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['number'] = user.number
        token['permisions'] = user.permisions

        return token

    def validate(self, attrs):

        validations.validate_se('number', attrs['number'], validations.validate_number)
        

        # if "'" in attrs.get('token'):
        #     raise serializers.ValidationError({'token': "invalid token c"})

        return super().validate(attrs)


class CustomUserResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'number', 'image_full_path', 'created_at', 'email', 'activity_type', 'number']

    def to_representation(self, instance):
        return {
            'firstName': instance.first_name,
            'lastName': instance.last_name,
            'imageFullPath': instance.image_full_path,
            'RigisteredAt': instance.created_at,
            'email': instance.email,
            'activityType': instance.activity_type,
            'number': instance.number
        }

class CustomUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email']

    def validate(self, attrs):

        validations.validate_se('first_name', attrs['first_name'], validations.validate_name)
        validations.validate_se('last_name', attrs['last_name'], validations.validate_name)
        
        return super().validate(attrs)

    def to_internal_value(self, data):
        data['first_name'] = data.get('first_name', None)
        data['last_name'] = data.get('last_name', None)
        return super().to_internal_value(data)




class ChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(max_length=50)
    current_password = serializers.CharField(max_length=50)