from django.db import models

# Create your models here.
class Mainpage(models.Model):
    order = models.IntegerField()
    page = models.CharField(max_length=50, unique=True)
    section = models.CharField(max_length=50)
    content = models.TextField(max_length=10000)
