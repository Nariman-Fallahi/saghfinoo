from django.db import models
from django.conf import settings

from users.models import CustomUser
from real_estate_offices.models import RealEstateOffice

from common.utils.database import formated_datetime_now

class Realtor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    real_estate_office = models.ForeignKey(RealEstateOffice, on_delete=models.SET_DEFAULT, null=True, blank=True, default=None)
    is_confirmed_by_real_estate_office = models.BooleanField(default=False) # must confirmed by real estate office owner
    is_confirmed = models.BooleanField(default=False) # must confirmed by admin

    telegram = models.CharField(max_length=100)
    whatsapp = models.CharField(max_length=100)
    twitter = models.CharField(max_length=100)
    facebook = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    score = models.FloatField(default=settings.REALTOR_DEFAULT_SCORE)
    number_of_active_ads = models.PositiveIntegerField(default=0)

    bg_image = models.CharField(max_length=1000, default='') # background image
    bg_image_full_path = models.CharField(max_length=1000, default='')

    description = models.CharField(max_length=200)
    number = models.CharField(max_length=11)
    landline_number = models.CharField(max_length=50)

    score_num = models.PositiveIntegerField(default=0)
    score_sum = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        reo = ''
        if self.real_estate_office:
            reo = self.real_estate_office.name
        return self.user.first_name +' '+ self.user.last_name +', '+ reo
    

class Comment(models.Model):
    realtor = models.ForeignKey(Realtor, on_delete=models.CASCADE)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    score = models.FloatField()
    description = models.CharField(max_length=200)

    created_at = models.DateTimeField(default=formated_datetime_now)
    modified_at = models.DateTimeField(default=formated_datetime_now)
