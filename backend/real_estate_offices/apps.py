from django.apps import AppConfig
from django.conf import settings


class RealEstateOfficesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'real_estate_offices'

    def ready(self) -> None:

        if not settings.DEBUG:
            try:
                from .models import CommentScoreReason, ReportReason
                CommentScoreReason.add_default_row()

                ReportReason.add_default_row()

            except Exception as e:
                print('ERROR in adding real estate office: '+str(e))


        return super().ready()
