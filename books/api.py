from os import stat_result
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status, viewsets
from users import serializers
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ViewSet):
    def get_books(self, request, *args, **kwargs):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_books_detail(self, request, id, format=None):
        books = Book.objects.get(id=id)
        serializer = BookSerializer(books)
        return Response(serializer.data)

    def put_books_detail(self, request, id, format=None):
        books = Book.objects.get(id=id)
        serializer = BookSerializer(books, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete_book_detail(self, request, id, format=None):
        books = Book.objects.get(id=id)
        books.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
