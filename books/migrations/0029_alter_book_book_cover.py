# Generated by Django 4.0.5 on 2022-07-11 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0028_alter_book_book_cover'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='book_cover',
            field=models.ImageField(blank=True, default='default-book-cover.png', null=True, upload_to='book-cover'),
        ),
    ]
