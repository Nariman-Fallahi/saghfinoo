from django.db import models
from django.utils import timezone
from django.conf import settings

from realtors.models import Realtor


class AdvertisementChoice(models.Model):
    key = models.CharField(max_length=50)
    value = models.CharField(max_length=50)
    en_value = models.CharField(max_length=50)

    @classmethod
    def add_default_rows(cls):
        default = (
            ('type', 'آپارتمان', 'apartment'),
            ('type', 'ویلا', 'villa'),
            ('deal_type', 'خرید', 'buy'),
            ('deal_type', 'رهن و اجاره', 'mortgage and rent'),
            ('deal_type', 'رهن کامل', 'full mortgage'),
            ('deal_type', 'اجاره', 'rent'),
            ('wc_type', 'فرنگی', 'farhangi'),
            ('wc_type', 'ایرانی', 'irani'),
            ('cooling_system', 'کولر آبی', 'water cooler'),
            ('cooling_system', 'کولر گازی', 'gas cooler'),
            ('heating_system', 'شوفاژ', 'shoofazh'),
            ('heating_system', 'بخاری گازی', 'gas heater'),
            ('heating_system', 'بخاری برقی', 'electric heater'),
            ('heating_system', 'گرمایش از کف', 'in-floor heating'),
            ('floor_meterial', 'سرامیک', 'ceramic'),
            ('floor_meterial', 'چوب', 'wood'),
            ('floor_meterial', 'کاشی', 'tile'),
        )

        if AdvertisementChoice.objects.count() == 0:
            for key, value in default:
                r = AdvertisementChoice()
                r.key = key
                r.value = value
                r.save()

def tz():
    return timezone.now().strftime(settings.REST_FRAMEWORK['DATETIME_FORMAT'])

class Advertisement(models.Model):
    owner = models.ForeignKey(Realtor, on_delete=models.CASCADE)

    is_confirmed = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(default=tz())
    modified_at = models.DateTimeField(default=tz())

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
