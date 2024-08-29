from django.db import models

from users.models import CustomUser
from common.utils.database import formated_datetime_now


class RealEstateOffice(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    username = models.CharField(max_length=100, unique=True)
    number = models.CharField(max_length=11)
    landline_number = models.CharField(max_length=50)
    
    city = models.CharField(max_length=50)
    main_street = models.CharField(max_length=50)
    sub_street = models.CharField(max_length=50)

    telegram = models.CharField(max_length=100)
    whatsapp = models.CharField(max_length=100)
    twitter = models.CharField(max_length=100)
    facebook = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    image = models.CharField(max_length=1000, default='')
    image_full_path = models.CharField(max_length=1000, default='')
    bg_image =models.CharField(max_length=1000, default='')
    bg_image_full_path = models.CharField(max_length=1000, default='')

    
    blue_tick = models.BooleanField(default=False)
    score = models.FloatField(default=5)
    number_of_active_ads = models.PositiveIntegerField(default=0)
    number_of_comments = models.PositiveIntegerField(default=0)

    score_num = models.PositiveIntegerField()
    score_sum = models.PositiveBigIntegerField()

    is_confirmed = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    

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
    real_estate_office = models.ForeignKey(RealEstateOffice, on_delete=models.CASCADE)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='real_estate_office_comment')

    score = models.FloatField()
    score_reason = models.ForeignKey(CommentScoreReason,on_delete=models.PROTECT)
    description = models.CharField(max_length=200)

    created_at = models.DateTimeField(default=formated_datetime_now)
    modified_at = models.DateTimeField(default=formated_datetime_now)


class ReportReason(models.Model):
    name = models.CharField(max_length=50)



    @classmethod
    def add_default_row(cls):
        defaults = (
            'اطلاعات کاربر اشتباه',
            'کلاه بردار',
        )

        for name in defaults:
            try:
                # not save if already exist
                ReportReason.objects.get(name=name)
                continue
            except ReportReason.DoesNotExist:
                pass

            r = ReportReason()
            r.name = name
            r.save()


class Report(models.Model):
    real_estate_office = models.ForeignKey(RealEstateOffice, on_delete=models.DO_NOTHING)
    report_reason = models.ForeignKey(ReportReason, on_delete=models.PROTECT)
    user = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, related_name='realestateoffice_report_user')

    description = models.CharField(max_length=500)

