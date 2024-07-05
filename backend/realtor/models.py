from django.db import models

from users.models import CustomUser
from real_estate_offices.models import RealEstateOffice

class Realtor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    real_estate_office = models.ForeignKey(RealEstateOffice, on_delete=models.SET_DEFAULT, null=True)

    score = models.FloatField()
    description = models.CharField(max_length=200)

    number_of_active_ads = models.PositiveIntegerField()

    number = models.CharField(max_length=11)
    landline_number = models.CharField(max_length=50)