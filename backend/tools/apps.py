from urllib.request import urlopen
import json

from django.apps import AppConfig

PROVINCES_COUNT = 31

class ToolsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tools'

    def ready(self) -> None:
        
        # get provinces and citics and save to database
        from .models import Province, City

        provices_url = "https://raw.githubusercontent.com/sajaddp/list-of-cities-in-iran/main/json/provinces.json"
        cities_url = "https://raw.githubusercontent.com/sajaddp/list-of-cities-in-iran/main/json/cities.json"
        print('setting up provinces and cities ...')
        try:
            
            
            if Province.objects.all().count() != PROVINCES_COUNT:
                provinces = json.load(urlopen(provices_url, timeout=20))
                cities = json.load(urlopen(cities_url, timeout=20))

                print('setting up provinces')
                for province in provinces:
                    
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

                if Province.objects.all().count() != len(cities):
                    print('saving up cities')
                    for city in cities:
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
        except Exception as e:
            print(f'ERROR in seting up provinces and cities: {type(e)}: {e}')

        else:
            print('done')

        


        return super().ready()
