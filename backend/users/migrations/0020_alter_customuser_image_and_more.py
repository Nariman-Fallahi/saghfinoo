# Generated by Django 5.0 on 2024-09-01 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_alter_customuser_created_at_alter_customuser_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='image',
            field=models.CharField(default='', max_length=1000),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='image_full_path',
            field=models.CharField(default='', max_length=1000),
        ),
    ]