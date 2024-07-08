from rest_framework import serializers

from common.utils import characters


def validate_number(number: str):
    if len(number) != 11:
        raise ValueError('invalid number length')
    
    if number[:2] != "09":
        raise ValueError('invalid number')
    
    try:
        int(number)
    except:
        raise ValueError('invalid number character')
    

def validate_landline_number(landline_number: str):
    if len(landline_number) < 5:
        raise ValueError('invalid number length')
    
    try:
        int(landline_number)
    except:
        raise ValueError('invalid number character')
    

def validate_name(name: str):
    valid_chars = characters.PERSIAN_CHARS + characters.ENGLISH_CHARS

    validate(name.lower(), valid_chars)
        
def validate_description(description: str):
    valid_chars = characters.PERSIAN_CHARS + characters.ENGLISH_CHARS + characters.PERSIAN_SIGNS + characters.ENGLISH_SIGNS

    validate(description.lower(), valid_chars)
        

def validate_username(username: str):
    valid_chars = characters.ENGLISH_CHARS + "_.-"

    validate(username.lower(), valid_chars)


def validate(string: str, valid_chars):

    for c in string:
        if c not in valid_chars:
            raise ValueError('invalid character: '+c)
            

def validate_se(field_name, field_value, validate_func):
    """validate with serializer exception"""

    try:
        validate_func(field_value)
    except Exception as e:
        raise serializers.ValidationError({field_name: str(e)})