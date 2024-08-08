from django.db import models

from users.models import CustomUser

class RealEstateOffice(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    username = models.CharField(max_length=100, unique=True)
    number = models.CharField(max_length=11)
    landline_number = models.CharField(max_length=50)
    
    city = models.CharField(max_length=50)
    main_street = models.CharField(max_length=50)
    sub_street = models.CharField(max_length=50)

    telegram = models.CharField(max_length=100)
    whatsapp = models.CharField(max_length=100)
    twitter = models.CharField(max_length=100)
    facebook = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    image = models.CharField(max_length=1000, default='')
    image_full_path = models.CharField(max_length=1000, default='')
    bg_image =models.CharField(max_length=1000, default='')
    bg_image_full_path = models.CharField(max_length=1000, default='')

    
    blue_tick = models.BooleanField(default=False)
    score = models.FloatField(default=5)
    number_of_active_ads = models.PositiveIntegerField(default=0)
    number_of_comments = models.PositiveIntegerField(default=0)

    is_confirmed = models.BooleanField(default=False)

    def __str__(self):
        return self.name