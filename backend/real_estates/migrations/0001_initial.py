# Generated by Django 5.0 on 2024-07-20 13:50

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('realtors', '0004_realtor_bg_image_realtor_bg_image_full_path'),
    ]

    operations = [
        migrations.CreateModel(
            name='RealEstateChoices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=50)),
                ('value', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='RealEstate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_confirmed', models.BooleanField(default=False)),
                ('created_at', models.DateField(default=django.utils.timezone.now)),
                ('modified_at', models.DateField(default=django.utils.timezone.now)),
                ('city', models.CharField(max_length=50)),
                ('main_street', models.CharField(max_length=50)),
                ('sub_street', models.CharField(max_length=50)),
                ('zone', models.IntegerField()),
                ('meterage', models.IntegerField()),
                ('type', models.CharField(max_length=50)),
                ('deal_type', models.CharField(max_length=50)),
                ('mortgage_price', models.IntegerField()),
                ('rent_price', models.IntegerField()),
                ('convertible', models.BooleanField()),
                ('buying_price', models.IntegerField()),
                ('number_of_rooms', models.IntegerField()),
                ('number_of_parkings', models.IntegerField()),
                ('number_of_warehouses', models.IntegerField()),
                ('number_of_wcs', models.IntegerField()),
                ('wc_type', models.CharField()),
                ('number_of_elevators', models.IntegerField()),
                ('floor_number', models.IntegerField()),
                ('total_number_of_floors', models.IntegerField()),
                ('heating_system', models.CharField(max_length=50)),
                ('cooling_system', models.CharField(max_length=50)),
                ('floor_meterial', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=1000)),
                ('map_position', models.CharField(max_length=100)),
                ('number_of_views', models.IntegerField()),
                ('number_of_saves', models.IntegerField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='realtors.realtor')),
            ],
        ),
        migrations.CreateModel(
            name='RealEstateImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.CharField(max_length=1000)),
                ('image_full_path', models.CharField(max_length=1000)),
                ('real_estate', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='real_estates.realestate')),
            ],
        ),
    ]