from django.db import models

from users.models import CustomUser
from real_estate_offices.models import RealEstateOffice

class Realtor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    real_estate_office = models.ForeignKey(RealEstateOffice, on_delete=models.SET_DEFAULT, null=True, blank=True, default=None)
    is_confirmed_by_real_estate_office = models.BooleanField(default=False) # must confirmed by real estate office owner
    is_confirmed = models.BooleanField(default=False) # must confirmed by admin

    score = models.FloatField(default=5)
    number_of_active_ads = models.PositiveIntegerField(default=0)

    bg_image = models.CharField(max_length=1000, default='') # background image
    bg_image_full_path = models.CharField(max_length=1000, default='')

    description = models.CharField(max_length=200)
    number = models.CharField(max_length=11)
    landline_number = models.CharField(max_length=50)

    def __str__(self):
        reo = ''
        if self.real_estate_office:
            reo = self.real_estate_office.name
        return self.user.first_name +' '+ self.user.last_name +', '+ reo