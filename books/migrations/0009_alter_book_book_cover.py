# Generated by Django 4.0.5 on 2022-07-01 22:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0008_alter_book_book_cover_alter_book_book_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='book_cover',
            field=models.ImageField(blank=True, default='default-book-cover.png', null=True, upload_to='book-cover'),
        ),
    ]
