from os import stat_result
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status, viewsets
from users import serializers
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer


class UserViewset(viewsets.ViewSet):
    def get_users(self, request, *args, **kwargs):
        user = CustomUser.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put_detail_user(self, request, id, format=None):
        user = CustomUser.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_detail_user(self, request, id, format=None):
        user = CustomUser.objects.get(id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def create_user(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# def delete_user(self, request, id, format=None):
#     user = CustomUser.objects.get(id=id)
#     user.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)