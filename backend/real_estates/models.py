from django.db import models
from django.utils import timezone

from realtors.models import Realtor


class RealEstateChoice(models.Model):
    key = models.CharField(max_length=50)
    value = models.CharField(max_length=50)

    @classmethod
    def add_default_rows(cls):
        default = (
            ('type', 'آپارتمان'),
            ('type', 'ویلا'),
            ('deal_type', 'خرید'),
            ('deal_type', 'رهن و اجاره'),
            ('deal_type', 'رهن کامل'),
            ('deal_type', 'اجاره'),
            ('wc_type', 'فرنگی'),
            ('wc_type', 'ایرانی'),
            ('cooling_system', 'کولر آبی'),
            ('cooling_system', 'کولر گازی'),
            ('heating_system', 'شوفاژ'),
            ('heating_system', 'بخاری گازی'),
            ('heating_system', 'بخاری برقی'),
            ('heating_system', 'گرمایش از کف'),
            ('floor_meterial', 'سرامیک'),
            ('floor_meterial', 'چوب'),
            ('floor_meterial', 'کاشی'),
        )

        if RealEstateChoice.objects.count() == 0:
            for key, value in default:
                r = RealEstateChoice()
                r.key = key
                r.value = value
                r.save()


class RealEstate(models.Model):
    owner = models.ForeignKey(Realtor, on_delete=models.CASCADE)

    is_confirmed = models.BooleanField(default=False)
    
    created_at = models.DateField(default=timezone.now)
    modified_at = models.DateField(default=timezone.now)

    city =models.CharField(max_length=50)
    main_street = models.CharField(max_length=50)
    sub_street = models.CharField(max_length=50)
    zone = models.IntegerField() # zone 1 or zone 2 or ...

    meterage = models.IntegerField()
    
    type = models.ForeignKey(RealEstateChoice, on_delete=models.PROTECT, related_name='type') # apartment or villa or ...
    deal_type = models.ForeignKey(RealEstateChoice, on_delete=models.PROTECT, related_name='deal_type') # buy or rent+mortgage or full mortgage or rent

    mortgage_price = models.BigIntegerField()
    rent_price = models.BigIntegerField()
    convertible = models.BooleanField()
    buying_price = models.BigIntegerField()

    number_of_rooms = models.IntegerField()
    number_of_parkings = models.IntegerField()
    number_of_warehouses = models.IntegerField()
    number_of_wcs = models.IntegerField()
    wc_type = models.ForeignKey(RealEstateChoice, on_delete=models.PROTECT, related_name='wc_type')
    number_of_elevators = models.IntegerField()
    floor_number = models.IntegerField()
    total_number_of_floors = models.IntegerField()

    heating_system = models.ForeignKey(RealEstateChoice, on_delete=models.PROTECT, related_name='heating_system')
    cooling_system = models.ForeignKey(RealEstateChoice, on_delete=models.PROTECT, related_name='cooling_system')
    floor_meterial = models.ForeignKey(RealEstateChoice, on_delete=models.PROTECT, related_name='floor_meterial')

    description = models.CharField(max_length=1000)

    map_position = models.CharField(max_length=100)

    number_of_views = models.IntegerField(default=0)
    number_of_saves = models.IntegerField(default=0)



class RealEstateImage(models.Model):
    real_estate = models.ForeignKey(RealEstate, on_delete=models.PROTECT)

    image = models.CharField(max_length=1000)
    image_full_path = models.CharField(max_length=1000)
