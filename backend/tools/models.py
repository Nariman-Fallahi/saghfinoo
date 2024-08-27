import json
from urllib.request import urlopen

from django.db import models



# Create your models here.

class Province(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.CharField(max_length=50)

    @classmethod
    def add_default_provinces(cls):
        provices_url = "https://raw.githubusercontent.com/sajaddp/list-of-cities-in-iran/main/json/provinces.json"
        provinces = json.load(urlopen(provices_url, timeout=20))
      
        if Province.objects.all().count() != len(provinces):

            print('setting up provinces')
            for province in provinces:   
                # continue if already exist
                try:
                    Province.objects.get(name=province)
                    continue                 
                except Province.DoesNotExist:
                    pass

                print(f'saving "{province["name"]}"')
                p = Province.objects.filter(name=province['name'])
                if len(p) == 0:
                    p = Province()
                else:
                    p = p[0]
                p.id = province['id']
                p.name = province['name']
                p.slug = province['slug']
                p.save()




class City(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.CharField(max_length=50)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)

    @classmethod
    def add_default_cities(cls):
        cities_url = "https://raw.githubusercontent.com/sajaddp/list-of-cities-in-iran/main/json/cities.json"
        cities = json.load(urlopen(cities_url, timeout=20))

        if Province.objects.all().count() != len(cities):
            

            print('saving up cities')
            for city in cities:
            
                # continue if already exist
                try:
                    City.objects.get(name=city)
                    continue                 
                except City.DoesNotExist:
                    pass
            
                print(f'setting up {city["name"]}')
                c = City.objects.filter(name=city['name'])
                if len(c) == 0:
                    c = City()
                else:
                    c = c[0]
                c.name = city['name']
                c.province = Province.objects.get(id=city['province_id'])
                c.slug = city['slug']
                c.save()

