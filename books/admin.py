from django.contrib import admin
from .models import Book, BookComments, BorrowBook
# Register your models here.
class BookAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'authorName',
        'added',
        
    )
    search_fields = [
        'title',
        'authorName',
        'authorEmail',
    ]


admin.site.register(Book, BookAdmin)
admin.site.register(BookComments)
admin.site.register(BorrowBook)