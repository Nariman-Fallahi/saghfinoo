from django.apps import AppConfig
from django.conf import settings


class RealEstatesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'advertisements'

    def ready(self) -> None:
            
            if settings.SAVE_DEFAULT_VALUES:

                from .models import AdvertisementChoice
                print('adding advertisement choices')
                try:
                    AdvertisementChoice.add_default_rows()
                except Exception as e:
                    print(e)
                print('done')

                return super().ready()
