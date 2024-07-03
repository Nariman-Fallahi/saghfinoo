from django.db import models

class RealEstateOffice(models.Model):
    # owner = models.ForeignKey(RealEstateAgent)
    name = models.CharField(max_length=50)
    score = models.FloatField()
    description = models.CharField(max_length=1000)
    
    city = models.CharField(max_length=50)
    main_street = models.CharField(max_length=50)
    sub_street = models.CharField(max_length=50)
    
    number_of_active_ads = models.PositiveIntegerField()
    number_of_comments = models.PositiveIntegerField()

    number = models.CharField(max_length=11)
    landline_number = models.CharField(max_length=50)

