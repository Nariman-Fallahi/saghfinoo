# Generated by Django 5.0 on 2024-08-22 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_alter_customuser_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='image',
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='image_full_path',
            field=models.CharField(max_length=1000, null=True),
        ),
    ]
