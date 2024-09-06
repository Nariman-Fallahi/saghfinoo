# Generated by Django 5.0 on 2024-09-01 12:00

import common.utils.database
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_alter_customuser_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='created_at',
            field=models.DateTimeField(default=common.utils.database.formated_datetime_now),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='image',
            field=models.CharField(default=None, max_length=1000),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='modified_at',
            field=models.DateTimeField(default=common.utils.database.formated_datetime_now),
        ),
    ]