from .models import CustomUser
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from common.utils import validations


class SendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, allow_null=True)
    phone_number = serializers.CharField(max_length=12, required=False, allow_null=True)

    def validate(self, attrs):

        if attrs.get('phone_number'):
            validations.validate_se('phone_number', attrs['phone_number'], validations.validate_number)
        elif attrs.get('email'):
            validations.validate_se('email', attrs['email'], validations.validate_email)
        else:
            serializers.ValidationError({'phone_number', "phone number or email is required"}, 'invalid_field ')


        return super().validate(attrs)

    def to_internal_value(self, data):
        data['phone_number'] = data.get('phoneNumber')

        return super().to_internal_value(data)

    def get_username_field(self) -> str:
        if self.validated_data.get('phone_number'):
            return str(self.validated_data.get('phone_number'))
        elif self.validated_data.get('email'):
            return str(self.validated_data.get('email'))

        raise ValueError(f"cannot find username field in SendOTPSerializer: phone_number: {self.validated_data.get('phone_number')}, email: {self.validated_data.get('email')}")

    def get_send_otp_method_name(self):
        if self.validated_data.get('phone_number'):
            return 'sms'
        else:
            return 'email'

class VerifyOTPSerializer(serializers.Serializer):
    code = serializers.IntegerField()
    phone_number = serializers.CharField(max_length=12, required=False, allow_null=True)
    email = serializers.EmailField(required=False, allow_null=True)
    token = serializers.UUIDField()

    def validate(self, attrs):

        if attrs.get('phone_number'):
            validations.validate_se('phone_number', attrs['phone_number'], validations.validate_number)
        elif attrs.get('email'):
            validations.validate_se('email', attrs['email'], validations.validate_email)
        else:
            serializers.ValidationError({'phone_number', "phone number or email is required"}, 'invalid_field ')

        return super().validate(attrs)


    def to_internal_value(self, data):
        data['phone_number'] = data.get('phoneNumber')

        return super().to_internal_value(data)

    def get_username_field(self) -> str:
        if self.validated_data.get('phone_number'):
            return str(self.validated_data.get('phone_number'))
        elif self.validated_data.get('email'):
            return str(self.validated_data.get('email'))

        raise ValueError(f"cannot find username field in VerifyOTPSerializer: phone_number: {self.validated_data.get('phone_number')}, email: {self.validated_data.get('email')}")


class SignupSerializer(serializers.ModelSerializer):
    token = serializers.UUIDField()

    class Meta:
        model = CustomUser
        fields = ['email', 'phone_number', 'first_name', 'last_name', 'password', 'token']


    def to_internal_value(self, data):
        data['first_name'] = data.get('firstName', None)
        data['last_name'] = data.get('lastName', None)
        data['phone_number'] = data.get('phoneNumber', None)

        return super().to_internal_value(data)

    def get_username_field(self) -> str:
        if self.validated_data.get('phone_number'):
            return str(self.validated_data.get('phone_number'))
        elif self.validated_data.get('email'):
            return str(self.validated_data.get('email'))

        raise ValueError(f"cannot find username field in SignupSerializer: phone_number: {self.validated_data.get('phone_number')}, email: {self.validated_data.get('email')}")


class SigninSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=11)
    password = serializers.CharField(max_length=512)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['permisions'] = user.permisions
        token['phone_number'] = user.phone_number

        return token

    def validate(self, attrs):

        validations.validate_se('username', attrs['username'], validations.validate_username)

        return super().validate(attrs)


class CustomUserResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'image_full_path', 'created_at', 'email', 'activity_type', 'phone_number']

    def to_representation(self, instance):
        return {
            'firstName': instance.first_name,
            'lastName': instance.last_name,
            'imageFullPath': instance.image_full_path,
            'RigisteredAt': instance.created_at,
            'email': instance.email,
            'activityType': instance.activity_type,
            'phoneNumber': instance.phone_number
        }

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email']

    def to_internal_value(self, data):
        data['first_name'] = data.get('first_name', None)
        data['last_name'] = data.get('last_name', None)
        return super().to_internal_value(data)


class ChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(max_length=50)
    current_password = serializers.CharField(max_length=50)
