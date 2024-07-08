from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone


from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    number = models.CharField(max_length=12, unique=True)
    first_name = models.CharField(max_length=51)
    last_name = models.CharField(max_length=52)
    password = models.CharField(max_length=512)

    image = models.CharField(max_length=1000, default='')
    image_full_path = models.CharField(max_length=1000, default='')

    is_active = models.BooleanField(default=True)
    permisions = models.CharField(max_length=53, default='')
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'number'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.first_name+' '+self.last_name+', '+self.number
    

