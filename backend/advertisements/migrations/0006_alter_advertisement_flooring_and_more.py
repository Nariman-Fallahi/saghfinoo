# Generated by Django 5.0 on 2024-08-06 15:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('advertisements', '0005_rename_floor_meterial_advertisement_flooring_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='advertisement',
            name='flooring',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='flooring', to='advertisements.advertisementchoice'),
        ),
        migrations.AlterField(
            model_name='advertisement',
            name='property_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='property_type', to='advertisements.advertisementchoice'),
        ),
        migrations.AlterField(
            model_name='advertisement',
            name='type_of_transaction',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='type_of_transaction', to='advertisements.advertisementchoice'),
        ),
    ]
