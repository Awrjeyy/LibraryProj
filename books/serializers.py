from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class UpdateBookSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255, required=False)
    authorName = serializers.CharField(max_length=255, required=False)
    authorEmail = serializers.CharField(max_length=255, required=False)
    book_condition = serializers.CharField(max_length=20, required=False)
    book_location = serializers.CharField(max_length=20, required=False)
    book_cover = serializers.ImageField(required=False)
    book_description = serializers.CharField(default="Put book description", required=False)
    class Meta:
        model = Book
        fields = (
            'title',
            'authorName',
            'authorEmail',
            'book_condition',
            'book_location',
            'book_cover',
            'book_description',
        )
        
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(UpdateUserSerializer, self).__init__(*args, **kwargs)

    def updateuser(self, instance, validated_data):
        
        user = self.request.user
        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})
        
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.user_img = validated_data['user_img']
        user.bio = validated_data['bio']

        user.save()

        return instance