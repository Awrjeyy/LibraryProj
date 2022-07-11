from functools import partial
from os import stat, stat_result
from urllib import request
from django import views
from django.shortcuts import render
from django.db.models.query_utils import Q
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from users import serializers
from .models import CustomUser
from books.models import Book
from .serializers import UserSerializer, RegisterSerializer, ChangePWSerializer, UpdateUserSerializer
from books.serializers import BookSerializer

class SearchViewset(viewsets.ViewSet):
    def searchuser(self, request, *args, **kwargs):
        
        query = request.GET.get('q')
        searchfilter = request.GET.get('searchfilter')
        
        if searchfilter == 'book':
            
            books_result = Book.objects.filter(
                Q(title__icontains=query) | Q(book_description__icontains=query)
            )
            serializer = BookSerializer(books_result, many=True)
             
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        
        elif searchfilter == 'users':
            user_results = CustomUser.objects.filter(
                Q(first_name__icontains=query) | Q(last_name__icontains=query)
            )
            serializer = UserSerializer(user_results, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        

        return Response(status=status.HTTP_400_BAD_REQUEST)
        
        

class UserViewset(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    def get_users(self, request, *args, **kwargs):
        user = CustomUser.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put_detail_user(self, request, id, format=None):
        permission_classes = [IsAuthenticated,]
        user = CustomUser.objects.get(id=id)
         
        if user.id == request.user.id:
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
    
    def get_detail_user(self, request, id, format=None):
        user = CustomUser.objects.get(id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def create_user(self, request, *args, **kwargs):
         
        import pdb; pdb.set_trace()

        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            user_account = serializer.save()
            token = Token.objects.get(user=user_account).key
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def userlogin(self, request, format=None):
         
        data = request.data

        email = data.get('email', None)
        password = data.get('password', None)
        user = authenticate(username=email, password=password)

        if user is not None:
            token = user.auth_token.key
            login(request, user)

            return Response(status.HTTP_200_OK)

        else:

            return Response({{'error': "Incorrect email or password."}})

    def userlogout(self, request, *args, **kwargs):
         
        request.user.auth_token.delete
        logout(request)
        return Response('Logged Out Successfully')

   


class ChangePassViewset(viewsets.ViewSet):

    model = CustomUser
    permission_classes = [IsAuthenticated,]


    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def changepassword(self, request, *args, **kwargs):
        serializer = ChangePWSerializer(data = self.request.data, request = self.request)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserViewset(viewsets.ViewSet):
    
    model = CustomUser
    permission_classes=[IsAuthenticated,]
    
    def get_user(self, queryset=None):
        obj = self.request.user
        return obj

    def updateuser(self, request, *args, **kwargs):
         
        user = self.request.user
        serializer = UpdateUserSerializer(user, data = self.request.data, request=self.request, partial=True)

        if serializer.is_valid():
            user = serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


