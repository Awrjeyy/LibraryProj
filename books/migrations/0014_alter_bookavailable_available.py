# Generated by Django 4.0.5 on 2022-07-05 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0013_bookavailable_delete_isavailable'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookavailable',
            name='available',
            field=models.BooleanField(choices=[(1, 1), (0, 0)], default=True),
        ),
    ]