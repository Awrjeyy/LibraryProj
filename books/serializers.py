from xml.etree.ElementTree import Comment
from rest_framework import serializers
from .models import Book, BorrowBook, BookComments

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        return super(BookSerializer, self).__init__(*args, **kwargs)


class BorrowedBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowBook
        fields = '__all__'

class BookCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookComments
        fields = '__all__'