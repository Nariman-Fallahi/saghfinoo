from django.apps import AppConfig
from django.conf import settings

class NewsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'news'

    def ready(self) -> None:
        
        if settings.SAVE_DEFAULT_VALUES:
            try:
                from .models import Category
                print('adding news categories')
                Category.add_default_rows()
            except Exception as e:
                print("ERROR in news: "+ str(e))

            return super().ready()
