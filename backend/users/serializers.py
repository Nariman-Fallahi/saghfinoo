from .models import CustomUser
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from common.utils import input_check

class VerifyNumberSerializer(serializers.Serializer):
    code = serializers.IntegerField()
    number = serializers.CharField(max_length=11)

    def validate(self, attrs):

        if len(attrs.get('number', '')) != 11 or attrs.get('number', '')[:2] != "09":
            raise serializers.ValidationError(f"invalid number length:{len(attrs.get('number', ''))}")

        if attrs.get('number', '')[:2] != "09":
            raise serializers.ValidationError("invalid number")

        

        return super().validate(attrs)

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'password']

    def validate(self, attrs):

        # if input_check.check_name(attrs['first_name']):
            # raise serializers.ValidationError("invalid first_name")

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

