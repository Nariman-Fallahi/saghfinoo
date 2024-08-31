from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone


from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    number = models.CharField(max_length=12, unique=True)
    first_name = models.CharField(max_length=51)
    last_name = models.CharField(max_length=52)
    password = models.CharField(max_length=512)
    email = models.EmailField(max_length=300, null=True, unique=True)

    image = models.CharField(max_length=1000, null=True)
    image_full_path = models.CharField(max_length=1000, null=True)

    is_active = models.BooleanField(default=True)
    permisions = models.CharField(max_length=53, default='')
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    activity_type = models.CharField(max_length=50,default='user')

    USERNAME_FIELD = 'number'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.first_name+' '+self.last_name+', '+self.number
    
    def fill_from_dict(self, data: dict):
        """this fields with be filled: first_name, last_name
            number and email are optional fields
            password will not change
        """

        self.number = data.get('number', self.number)
        self.email = data.get('email', self.email)

        self.first_name = data['first_name']
        self.last_name = data['last_name']


