# Generated by Django 4.0.5 on 2022-06-28 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_customuser_user_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='bio',
            field=models.TextField(default=0),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='user_img',
            field=models.ImageField(default='default.jpg', upload_to='profile_pics'),
        ),
    ]
