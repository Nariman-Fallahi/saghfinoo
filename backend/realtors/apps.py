from django.apps import AppConfig
from django.conf import settings


class RealtorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'realtors'

    def ready(self):
        if not settings.DEBUG:
            try:
                from .models import CommentScoreReason, ReportReason
                
                CommentScoreReason.add_default_row()

                ReportReason.add_default_row()

            except Exception as e:
                print("EEROR in realtors: "+str(e))
