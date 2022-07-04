from asyncio.windows_events import NULL
from pyexpat import model
from django.db import models
from django.conf import settings
from PIL import Image

# Create your models here.

User = settings.AUTH_USER_MODEL
class Book(models.Model):
    physical = 'Physical'
    digital = 'Digital'
    book_type_choices = (
        (physical, 'Phyiscal'),
        (digital, 'Digital'),
    )
    home = 'Home'
    office = 'Office'
    matrix = 'Into the Matrix'
    location_choices = (
        (home, 'Home'),
        (office, 'Office'),
        (matrix, 'Into the Matrix'),
    )
    title = models.CharField(max_length=255)
    authorName = models.CharField(max_length=255)
    authorEmail = models.CharField(max_length=255)
    added = models.DateTimeField(auto_now_add=True)
    book_condition = models.CharField(max_length=20, choices=book_type_choices, default=physical)
    book_location = models.CharField(max_length=20, choices=location_choices, default=digital)
    book_cover = models.ImageField(blank=True, null=True, default='default-book-cover.png',
        upload_to='book-cover',
    )
    book_description = models.TextField(default="Put book description")
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=0)

    def save(self, *args, **kwargs):
        super().save()

        bk_cover = Image.open(self.book_cover.path)

        if bk_cover.height > 100 or bk_cover.width > 100:
            new_img = (300, 300)
            bk_cover.thumbnail(new_img)
            bk_cover.save(self.book_cover.path)