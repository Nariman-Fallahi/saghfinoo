from django.db import models
from django.conf import settings

from users.models import CustomUser
from real_estate_offices.models import RealEstateOffice

from common.utils.database import formated_datetime_now

class Realtor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    real_estate_office = models.ForeignKey(RealEstateOffice, on_delete=models.SET_DEFAULT, null=True, blank=True, default=None)
    is_confirmed_by_real_estate_office = models.BooleanField(default=False) # must confirmed by real estate office owner
    is_confirmed = models.BooleanField(default=False) # must confirmed by admin

    telegram = models.CharField(max_length=100)
    whatsapp = models.CharField(max_length=100)
    twitter = models.CharField(max_length=100)
    facebook = models.CharField(max_length=100)
    email = models.EmailField()

    score = models.FloatField(default=settings.REALTOR_DEFAULT_SCORE)
    number_of_active_ads = models.PositiveIntegerField(default=0)

    blue_tick = models.BooleanField(default=False)

    bg_image = models.CharField(max_length=1000, default='') # background image
    bg_image_full_path = models.CharField(max_length=1000, default='')

    description = models.CharField(max_length=200)
    number = models.CharField(max_length=11)
    landline_number = models.CharField(max_length=50)

    score_num = models.PositiveIntegerField(default=0)
    score_sum = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        reo = ''
        if self.real_estate_office:
            reo = self.real_estate_office.name
        return self.user.first_name +' '+ self.user.last_name +', '+ reo
    

class CommentScoreReason(models.Model):
    name = models.CharField(max_length=50)
    score = models.IntegerField()

    @classmethod
    def add_default_row(cls):
        defaults = (
            ('دریافت کمیسیون اضافی', 1),
            ('عدم پاسخگویی', 1),
            ('برخورد نامناسب', 1),
            ('عدم شناخت بازار', 1),
            ('دریافت کمیسیون اضافی', 2),
            ('عدم پاسخگویی', 2),
            ('برخورد نامناسب', 2),
            ('عدم شناخت بازار', 2),
            ('دریافت کمیسیون اضافی', 3),
            ('عدم پاسخگویی', 3),
            ('برخورد نامناسب', 3),
            ('عدم شناخت بازار', 3),
            ('متعهد و پیگیر بودن', 3),
            ('داشتن تخصص و مهارت کافی', 3),
            ('وقت‌شناسی', 3),
            ('برخورد و رفتار محترمانه', 3),
            ('دریافت کمیسیون اضافی', 4),
            ('برخورد نامناسب', 4),
            ('وقت‌شناسی', 4),
            ('برخورد و رفتار محترمانه', 4),
            ('دریافت کمیسیون اضافی', 5),
            ('برخورد نامناسب', 5),
            ('وقت‌شناسی', 5),
            ('برخورد و رفتار محترمانه', 5),
            
        )

        for name, score in defaults:
            try:
                # not save if already exist
                CommentScoreReason.objects.get(name=name, score=score)
                continue
            except CommentScoreReason.DoesNotExist:
                pass

            csr = CommentScoreReason()
            csr.name = name
            csr.score = score
            csr.save()



class Comment(models.Model):
    realtor = models.ForeignKey(Realtor, on_delete=models.CASCADE)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    score = models.FloatField()
    score_reason = models.ForeignKey(CommentScoreReason,on_delete=models.PROTECT)
    description = models.CharField(max_length=200)

    created_at = models.DateTimeField(default=formated_datetime_now)
    modified_at = models.DateTimeField(default=formated_datetime_now)

