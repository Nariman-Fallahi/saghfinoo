from django.db import models
from django.utils import timezone
from django.conf import settings

from realtors.models import Realtor
from users.models import CustomUser

from common.utils.database import formated_datetime_now

class AdvertisementChoice(models.Model):
    key = models.CharField(max_length=50)
    value = models.CharField(max_length=50)
    en_value = models.CharField(max_length=50)

    @classmethod
    def add_default_rows(cls):
        default = (
            ('property_type', 'آپارتمان', 'apartment'),
            ('property_type', 'ویلا', 'villa'),
            # ('type_of_transaction', 'خرید', 'buy'),
            ('type_of_transaction', 'رهن و اجاره', 'rent and deposit'),
            ('type_of_transaction', 'رهن کامل', 'full deposit'),
            ('type_of_transaction', 'اجاره', 'rent'),
            ('type_of_restroom', 'فرنگی', 'farhangi'),
            ('type_of_restroom', 'ایرانی', 'irani'),
            ('cooling_system', 'کولر آبی', 'water cooler'),
            ('cooling_system', 'چیلر', 'chiller'),
            ('cooling_system', 'اسپلیت', 'split'),
            ('cooling_system', 'فن کوئل', 'fan koel'),
            ('heating_system', 'شومینه', 'fireplace'),
            ('heating_system', 'اسپلیت', 'split'),
            ('heating_system', 'مرکزی', 'centeral'),
            ('heating_system', 'از کف', 'in-floor'),
            ('heating_system', 'رادیاتور', 'radiator'),
            ('flooring', 'سرامیک', 'ceramic'),
            ('flooring', 'سنگ', 'stone'),
            ('flooring', 'پارکت', 'parquet'),
            ('flooring', 'لمینت', 'laminate'),
            ('flooring', 'موزائیک', 'mosaic'),
        )

        if AdvertisementChoice.objects.count() < len(default):
            for key, value in default:
                
                # continue if already exist
                try:
                    AdvertisementChoice.get(key=key, value=value)
                    continue
                except AdvertisementChoice.DoesNotExist:
                    pass

                r = AdvertisementChoice()
                r.key = key
                r.value = value
                r.save()


class Advertisement(models.Model):
    owner = models.ForeignKey(Realtor, on_delete=models.CASCADE)

    is_confirmed = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(default=formated_datetime_now)
    modified_at = models.DateTimeField(default=formated_datetime_now)

    province = models.CharField(max_length=50)
    city =models.CharField(max_length=50)
    main_street = models.CharField(max_length=50)
    side_street = models.CharField(max_length=50)
    map_position = models.CharField(max_length=100, null=True)

    
    property_type = models.ForeignKey(AdvertisementChoice, on_delete=models.PROTECT, related_name='property_type') # apartment or villa or ...
    type_of_transaction = models.ForeignKey(AdvertisementChoice, on_delete=models.PROTECT, related_name='type_of_transaction') # rent+mortgage or full mortgage or rent

    deposit = models.BigIntegerField()
    rent = models.BigIntegerField()
    convertible = models.BooleanField()

    area = models.IntegerField()
    room = models.IntegerField()
    parking = models.IntegerField()
    storage = models.IntegerField()
    restroom = models.IntegerField()
    type_of_restroom = models.ForeignKey(AdvertisementChoice, on_delete=models.PROTECT, related_name='type_of_restroom')
    elevator = models.IntegerField()
    floor = models.IntegerField() # floor number
    number_of_floors = models.IntegerField() # total number of floors

    heating_system = models.ForeignKey(AdvertisementChoice, on_delete=models.PROTECT, related_name='heating_system')
    cooling_system = models.ForeignKey(AdvertisementChoice, on_delete=models.PROTECT, related_name='cooling_system')
    flooring = models.ForeignKey(AdvertisementChoice, on_delete=models.PROTECT, related_name='flooring')

    description = models.CharField(max_length=1000, blank=True)


    number_of_views = models.IntegerField(default=0)
    number_of_saves = models.IntegerField(default=0)

    image_full_path = models.CharField(max_length=1000, default='') # primary image (also added in RealEstateImage)



class AdvertisementImage(models.Model):
    advertisement = models.ForeignKey(Advertisement, on_delete=models.PROTECT)

    image = models.CharField(max_length=1000)
    image_full_path = models.CharField(max_length=1000)


class SavedAdvertisement(models.Model):
    advertisement = models.ForeignKey(Advertisement, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(default=formated_datetime_now)