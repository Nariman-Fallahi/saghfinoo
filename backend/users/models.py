from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    number = models.CharField(max_length=12, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    image = models.CharField(max_length=1000, default='')

    is_active = models.BooleanField(default=True)
    permisions = models.CharField(max_length=50, default='')
    CreatedAt = models.DateTimeField(default=timezone.now())
    ModifiedAt = models.DateTimeField(default=timezone.now())
    
    
    USERNAME_FIELD = 'number'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.number
