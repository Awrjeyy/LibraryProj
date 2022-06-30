from pyexpat import model
from django.db import models
from django.conf import settings
from PIL import Image

# Create your models here.

# User = settings.AUTH_USER_MODEL
class Book(models.Model):
    Physical = 'Physical'
    Digital = 'Digital'
    book_type_choices = (
        (Physical, 'Phyiscal'),
        (Digital, 'Digital'),
    )
    Home = 'Home'
    Office = 'Office'
    Matrix = 'Into the Matrix'
    location_choices = (
        (Home, 'Home'),
        (Office, 'Office'),
        (Matrix, 'into the matrix'),
    )
    title = models.CharField(max_length=255)
    authorName = models.CharField(max_length=255)
    authorEmail = models.CharField(max_length=255)
    added = models.DateTimeField(auto_now_add=True)
    book_condition = models.CharField(max_length=20, choices=book_type_choices, default=Physical)
    book_location = models.CharField(max_length=20, choices=location_choices, default=Matrix)
    book_cover = models.ImageField(default='default-book-cover.jpg',
        upload_to='book-cover',
    )
    # ownerid = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        super().save()

        bk_cover = Image.open(self.book_cover.path)

        if bk_cover.height > 100 or bk_cover.width > 100:
            new_img = (300, 300)
            bk_cover.thumbnail(new_img)
            bk_cover.save(self.book_cover.path)