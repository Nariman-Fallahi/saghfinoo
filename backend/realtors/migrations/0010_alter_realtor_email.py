# Generated by Django 5.0 on 2024-08-22 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('realtors', '0009_commentscorereason_realtor_blue_tick_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='realtor',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]
