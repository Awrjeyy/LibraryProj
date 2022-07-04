from os import stat_result
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status, viewsets
from users import serializers
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer


class UserViewset(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    def get_users(self, request, *args, **kwargs):
        user = CustomUser.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put_detail_user(self, request, id, format=None):
        user = CustomUser.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_detail_user(self, request, id, format=None):
        user = CustomUser.objects.get(id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def create_user(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            user_account = serializer.save()
            token = Token.objects.get(user=user_account).key
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def userlogin(self, request, format=None):
        # import pdb; pdb.set_trace()
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

# def delete_user(self, request, id, format=None):
#     user = CustomUser.objects.get(id=id)
#     user.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)