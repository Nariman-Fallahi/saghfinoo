from .models import CustomUser
from rest_framework import serializers


class VerifyNumberSerializer(serializers.Serializer):
    number = serializers.CharField(max_length=12)
    code = serializers.IntegerField()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['number', 'first_name', 'last_name', 'password']


class SigninSerializer(serializers.Serializer):
    number = serializers.CharField(max_length=12)
    password = serializers.CharField(max_length=50)

