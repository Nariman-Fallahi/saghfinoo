from rest_framework import serializers

from common.utils import validations

from .models import Mainpage

class MainpageResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mainpage
        fields = ['order' ,'page', 'section', 'content']

class MainpageSerializer(serializers.ModelSerializer):

    class Meta:
        model= Mainpage
        fields = ['order', 'section', 'content']

    def validate(self, attrs):
        validations.validate_se('section', attrs['section'], validations.validate_description)
        validations.validate_se('content', attrs['content'], validations.validate_description)
        return super().validate(attrs)
    


