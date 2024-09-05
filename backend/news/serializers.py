from rest_framework import serializers

from common.utils import characters
from common.utils import validations
from .models import News, Category

class NewsSerializer(serializers.ModelSerializer):

    class Meta:
        model = News
        fields = [
            'title',
            'slug',
            'short_description',
            'content',
            'tags',
            'read_time',
            'category',
            'special',
        ]

    def to_internal_value(self, data):
        data['short_description'] = data.get('shortDescription', None)
        data['read_time'] = data.get('readTime', None)
        return super().to_internal_value(data)
    
    def validate(self, attrs):

        validations.validate_se('title', attrs['title'], validations.validate_description)
        validations.validate_se('slug', attrs['slug'], validations.validate_slug)
        validations.validate_se('short_description', attrs['short_description'], validations.validate_description)
        validations.validate_se('content', attrs['content'], validations.validate_description)
        validations.validate_se('tags', attrs['tags'], lambda string: validations.validate_tag)
        validations.validate_se('read_time', attrs['read_time'], lambda x: validations.validate_integer(x, (1, 120)))

        return super().validate(attrs)
    
class NewsResponseSerailizer(serializers.ModelSerializer):

    class Meta:
        model = News

    def to_representation(self, instance):
        return {
            'title': instance.title,
            'slug': instance.slug,
            'shortDescription': instance.short_description,
            'content': instance.content,
            'tags': instance.tags,
            'readTime': instance.read_time,
            'category': instance.category.name,
            'publishDate': instance.publish_data,
            'imageFullPath': instance.image_full_path,
        }
    
class NewsPreviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = News

    def to_representation(self, instance):
        return {
            'imageFullPath': instance.image_full_path,
            'readTime': instance.read_time,
            'title': instance.title,
            'shortDescription': instance.short_description,
            'category': instance.category.name,
            'special': instance.special,
        }
    
class CategoryResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['name']