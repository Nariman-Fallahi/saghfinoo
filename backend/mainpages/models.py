from django.db import models

# Create your models here.
class Mainpage(models.Model):
    order = models.IntegerField()
    page = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=10000, blank=True)
    btn_text = models.CharField(max_length=50)
    icon = models.CharField(max_length=1000)
