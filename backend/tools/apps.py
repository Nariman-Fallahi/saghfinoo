from django.apps import AppConfig
from django.conf import settings

class ToolsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tools'

    def ready(self) -> None:
        
        if not settings.DEBUG:
            # get provinces and citics and save to database
            from .models import Province, City

            print('setting up provinces and cities ...')
            try:
                Province.add_default_provinces()
                City.add_default_cities()
                
            except Exception as e:
                print(f'ERROR in seting up provinces and cities: {type(e)}: {e}')

            else:
                print('done')

        


        return super().ready()
