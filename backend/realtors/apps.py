from django.apps import AppConfig


class RealtorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'realtors'

    def ready(self):

        try:
            from .models import CommentScoreReason
            CommentScoreReason.add_default_row()
        except Exception as e:
            print("EEROR in adding CommentScoreReason: "+str(e))
