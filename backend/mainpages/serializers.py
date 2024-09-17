from rest_framework import serializers

from common.utils import validations

from .models import Mainpage

class MainpageResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mainpage
        fields = ['order', 'title', 'description']

class MainpageSerializer(serializers.ModelSerializer):

    class Meta:
        model= Mainpage
        fields = ['order', 'title', 'description']

    def validate(self, attrs):
        validations.validate_se('title', attrs['title'], validations.validate_description)
        validations.validate_se('description', attrs['description'], validations.validate_description)
        return super().validate(attrs)
    


