from xml.etree.ElementTree import Comment
from rest_framework import serializers
from .models import Book, BorrowBook, BookComments

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        return super(BookSerializer, self).__init__(*args, **kwargs)

class CreateBookSerialzier(serializers.ModelSerializer):
    book_cover = serializers.ImageField(allow_empty_file=True, use_url=True)
    class Meta:
        model = Book
        fields = (
            'book_cover',
            'title',
            'authorName',
            'authorEmail',
            'book_condition',
            'book_location',
        )
        

class BorrowedBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowBook
        fields = '__all__'

class BookCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookComments
        fields = '__all__'