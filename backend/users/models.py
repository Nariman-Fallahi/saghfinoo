from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from common.utils.database import formated_datetime_now
from common.utils.validations import validate_name, validate_number

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=200, unique=True, null=True) # TODO: remove null
    phone_number = models.CharField(max_length=12, unique=True, null=True, validators=[validate_number])
    email = models.EmailField(max_length=300, null=True, unique=True)
    first_name = models.CharField(max_length=51, validators=[validate_name])
    last_name = models.CharField(max_length=52, validators=[validate_name])
    password = models.CharField(max_length=512)

    image = models.CharField(max_length=1000,  default='')
    image_full_path = models.CharField(max_length=1000, default='')

    is_active = models.BooleanField(default=True)
    permisions = models.CharField(max_length=53, default='')
    created_at = models.DateTimeField(default=formated_datetime_now)
    modified_at = models.DateTimeField(default=formated_datetime_now)
    is_staff = models.BooleanField(default=False)
    activity_type = models.CharField(max_length=50,default='user')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.first_name+' '+self.last_name+', '+self.phone_number

    def fill_from_dict(self, data: dict):
        """this fields with be filled: first_name, last_name
            number and email are optional fields
            password will not change
        """

        self.phone_number = data.get('number', self.phone_number)
        self.email = data.get('email', self.email)

        self.first_name = data['first_name']
        self.last_name = data['last_name']
