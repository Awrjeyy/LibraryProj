from rest_framework import serializers
from .models import Book, BorrowBook

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BorrowedBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowBook
        fields = '__all__'