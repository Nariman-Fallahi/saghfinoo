from django.conf import settings
from django.utils import timezone

def formated_datatime_now():
    return timezone.now().strftime(settings.REST_FRAMEWORK['DATETIME_FORMANT'])
