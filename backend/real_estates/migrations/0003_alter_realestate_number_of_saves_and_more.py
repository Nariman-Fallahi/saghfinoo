# Generated by Django 5.0 on 2024-07-20 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('real_estates', '0002_alter_realestate_cooling_system_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='realestate',
            name='number_of_saves',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='realestate',
            name='number_of_views',
            field=models.IntegerField(default=0),
        ),
    ]
