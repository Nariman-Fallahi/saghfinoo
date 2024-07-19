from typing import Any, Dict
from .models import CustomUser
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from common.utils import validations

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
        

        if "'" in attrs.get('token'):
            raise serializers.ValidationError({'token': "invalid token c"})

        return super().validate(attrs)


class CustomUserResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'number', 'image_full_path', 'created_at']


