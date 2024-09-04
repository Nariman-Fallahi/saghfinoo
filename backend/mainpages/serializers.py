from rest_framework import serializers

from .models import Mainpage

class MainpageResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mainpage
        fields = ['order' ,'page', 'section', 'content']