# Generated by Django 4.0.5 on 2022-07-06 13:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0021_rename_borrow_id_book_borrow'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='book_available',
        ),
        migrations.RemoveField(
            model_name='book',
            name='book_return',
        ),
        migrations.RemoveField(
            model_name='book',
            name='borrow',
        ),
    ]
