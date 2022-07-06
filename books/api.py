from functools import partial
from os import stat_result
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from users import serializers
from .models import Book, BorrowBook
from .serializers import BookSerializer, BorrowedBookSerializer

class BookViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    
    def get_books(self, request, *args, **kwargs):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post_books(self, request, *args, **kwargs):

        serializer = BookSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(owner_id = request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_books_detail(self, request, id, format=None):
        # import pdb;pdb.set_trace()
        books = Book.objects.get(id=id)
        serializer1 = BookSerializer(books)
        return Response(serializer1.data)

    def put_books_detail(self, request, id, format=None):
        # import pdb; pdb.set_trace()

        books = Book.objects.get(id=id)
        if books.owner_id == request.user.id:
            serializer = BookSerializer(books, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_borrowed_book(self, request, id, format=None):
        # import pdb; pdb.set_trace()
        books = BorrowBook.objects.filter(book_id=id).first()
        serializer = BorrowedBookSerializer(books)
            
        return Response(serializer.data)

    def borrow_book(self, request, id, format=None):
        # import pdb; pdb.set_trace()
        books = Book.objects.get(id=id)
        serializer = BorrowedBookSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def return_book(self, request, id, format=None):
        books = BorrowBook.objects.get(book=id, book_available=0, book_return=0)
        serializer = BorrowedBookSerializer(books, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete_book_detail(self, request, id, format=None):
        books = Book.objects.get(id=id)
        books.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

