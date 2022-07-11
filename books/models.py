from asyncio.windows_events import NULL
from pyexpat import model
from venv import create
from zoneinfo import available_timezones
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
    updated = models.DateTimeField(auto_now=True)
    book_condition = models.CharField(max_length=20, choices=book_type_choices, default=physical)
    book_location = models.CharField(max_length=20, choices=location_choices, default=digital)
    book_cover = models.ImageField(blank=True, null=True, default='default-book-cover.png',
        upload_to='book-cover',
    )
    book_description = models.TextField(default="Put book description")
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="books_owner")

    likes = models.ManyToManyField(User, related_name="books_likes")
    
    


    class Meta:
        ordering = ['-added']

    def save(self, *args, **kwargs):
        super().save()

        book_cover = Image.open(self.book_cover.path)

        if book_cover.height > 100 or book_cover.width > 100:
            new_img = (300, 300)
            book_cover.thumbnail(new_img)
            book_cover.save(self.book_cover.path)

class BorrowBook(models.Model):

    borrow = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="books_borrower")

    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True, related_name="rented_book")

    book_available = models.BooleanField(default=True)

    borrowed_on = models.DateTimeField(auto_now_add=True)

    book_return = models.BooleanField(default=False)

    returned_on = models.DateTimeField(auto_now=True)

    

    class Meta:
        ordering = ['-borrowed_on']
    
    def __str__(self):
        return 'Borrowed by {}'.format(self.borrow)
class BookComments(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_firstname = models.CharField(max_length=255, default="")
    user_lastname = models.CharField(max_length=255, default="")
    bookcontent = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta: 
        ordering = ['-created_on']

    def __str__(self):
        return 'Comment by {}'.format(self.user)