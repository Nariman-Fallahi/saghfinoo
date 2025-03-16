from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.core.validators import validate_email as validate_email_django

from common.utils import characters
from common.utils.algorithms import binary_search

def validate_number(number: str):
    if len(number) != 11:
        raise ValueError('invalid number length')
    
    if number[:2] != "09":
        raise ValueError('invalid number')
    
    try:
        int(number)
    except:
        raise ValueError('invalid number character')

def validate_email(email: str):
    try:
        validate_email_django(email)
    except ValidationError as e:
        raise ValueError(f"{e} value is:  {email}")

def validate_landline_number(landline_number: str):
    if len(landline_number) < 5:
        raise ValueError('invalid number length')
    
    try:
        int(landline_number)
    except:
        raise ValueError('invalid number character')
    

def validate_name(name: str):
    valid_chars = characters.NAME_CHARS
    validate(name, valid_chars)
        
def validate_description(description: str):
    valid_chars = characters.DESCRIPTION_CHARS

    for tag in characters.HTML_INVALID_TAGS:
        if tag in description:
            raise ValueError('invalid description')

    validate(description, valid_chars)

def validate_slug(slug: str):
    valid_chars = characters.SLUG_CHARS

    validate(slug, valid_chars)


def validate_tag(tag: str):
    valid_chars = characters.TAG_CHARS

    validate(tag, valid_chars)


def validate_username(username: str):
    valid_chars = characters.USERNAME_CHARS

    validate(username, valid_chars)

def validate_choice_se(field_name, field_value):
    if field_value.key != field_name:
        raise serializers.ValidationError({field_name:f'{field_name} with id={field_value.id} not found. this id is for {field_value.key} not {field_name}'})

def validate_integer(value, range: tuple = None):
    """validate a string that have integer
        range is a tuple (from, to). range[0] <= value <= range[1]"""
    if type(value) == int:
        return
    
    if type(value) != str:
        raise ValueError('invalid integer')
    try:
        int(value)
    except:
        raise ValueError('invalid integer')

    if range:
        if not(range[0] <= value <= range[1]):
            raise ValueError(f'invalid integer range. valid: {range[0]} to {range[1]}')


def validate(string: str, valid_chars):
    if type(string) != str:
        raise ValueError('invalid string')

    for c in string.lower():
        if binary_search(valid_chars, c) == -1:
            raise ValueError(f'invalid character: {c}')
            

def validate_se(field_name, field_value, validate_func):
    """validate with serializer exception"""

    try:
        validate_func(field_value)
    except ValueError as e:
        raise serializers.ValidationError({field_name: str(e)})