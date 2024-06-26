# Generated by Django 5.0 on 2024-06-25 11:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='CreatedAt',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 25, 11, 3, 36, 527071, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='ModifiedAt',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 25, 11, 3, 36, 527094, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='first_name',
            field=models.CharField(max_length=51),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(max_length=52),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='password',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='permisions',
            field=models.CharField(default='', max_length=53),
        ),
    ]