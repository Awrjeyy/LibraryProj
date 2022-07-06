from xml.etree.ElementTree import Comment
from rest_framework import serializers
from .models import Book, BorrowBook, BookComments

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BorrowedBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowBook
        fields = '__all__'

class BookCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookComments
        fields = '__all__'