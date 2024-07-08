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
