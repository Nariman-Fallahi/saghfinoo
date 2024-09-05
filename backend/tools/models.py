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
      
        if Province.objects.all().count() < len(provinces):
            provinces_list = []
            
            print('saving provinces')
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
                provinces_list.append(p)
            
            Province.objects.bulk_create(provinces_list)




class City(models.Model):
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=50)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)

    @classmethod
    def add_default_cities(cls):
        cities_url = "https://raw.githubusercontent.com/sajaddp/list-of-cities-in-iran/main/json/cities.json"
        cities = json.load(urlopen(cities_url, timeout=20))

        if City.objects.all().count() < len(cities):
            cities_list = []

            print('saving cities')
            for city in cities:

                # continue if already exist
                try:
                    City.objects.get(name=city['name'], province=city['province_id'])
                    print(f'{city["name"]} already exsit. skip')    
                    continue                 
                except City.DoesNotExist:
                    pass

                c = City()
                c.name = city['name']
                c.province = Province.objects.get(id=city['province_id'])
                c.slug = city['slug']

                cities_list.append(c)
                # c.save()

            City.objects.bulk_create(cities_list)

