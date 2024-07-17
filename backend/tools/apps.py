from urllib.request import urlopen
import json

from django.apps import AppConfig

from .models import Province, City


class ToolsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tools'

    def ready(self) -> None:

        # get provinces and citics and save to database

        provices_url = "https://github.com/sajaddp/list-cities-of-in-iran/blob/main/json/provices.json"
        cities_url = "https://github.com/sajaddp/list-cities-of-in-iran/blob/main/json/cities.json"
        print('seting up provinces and cities ...')
        try:

            provinces = json.load(urlopen(provices_url, timeout=20))
            cities = json.load(urlopen(cities_url, timeout=20))

            if Province.objects.all().count() != len(provinces):
                for province in provinces:
                    p = Province()
                    p.name = province['name']
                    p.save()

            if Province.objects.all().count() != len(cities):
                for city in cities:
                    c = City()
                    c.name = city['name']
                    c.province = Province.objects.get(id=city['province_id'])
                    c.save()
        except Exception as e:
            print(f'ERROR in seting up provinces and cities: {type(e)}: {e}')

        else:
            print('done')

        


        return super().ready()
