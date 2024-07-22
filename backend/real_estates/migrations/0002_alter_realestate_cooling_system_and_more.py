# Generated by Django 5.0 on 2024-07-20 14:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('real_estates', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='realestate',
            name='cooling_system',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='cooling_system', to='real_estates.realestatechoices'),
        ),
        migrations.AlterField(
            model_name='realestate',
            name='deal_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='deal_type', to='real_estates.realestatechoices'),
        ),
        migrations.AlterField(
            model_name='realestate',
            name='floor_meterial',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='floor_meterial', to='real_estates.realestatechoices'),
        ),
        migrations.AlterField(
            model_name='realestate',
            name='heating_system',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='heating_system', to='real_estates.realestatechoices'),
        ),
        migrations.AlterField(
            model_name='realestate',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='type', to='real_estates.realestatechoices'),
        ),
        migrations.AlterField(
            model_name='realestate',
            name='wc_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='wc_type', to='real_estates.realestatechoices'),
        ),
    ]
