# Generated by Django 5.0 on 2024-07-07 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('real_estate_offices', '0002_realestateoffice_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='realestateoffice',
            name='blue_tick',
            field=models.BooleanField(default=False),
        ),
    ]
