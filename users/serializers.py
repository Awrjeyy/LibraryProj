from pyexpat import model
from pkg_resources import require
from rest_framework import serializers

from books.models import Book
from .models import CustomUser
from django.utils.translation import gettext as _
from django.core.validators import RegexValidator
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from books.serializers import BookSerializer



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        return super(UserSerializer, self).__init__(*args, **kwargs)

class RegisterSerializer(serializers.ModelSerializer):
    alpha = RegexValidator(r'^[a-zA-Z]*$', 'Only alphabet characters are allowed.')
    first_name = serializers.CharField(label="First name", required=True, max_length=100, validators=[alpha])
    last_name = serializers.CharField(label="Last name", required=True, max_length=100, validators=[alpha])
    password = serializers.CharField(required=True, write_only=True, validators=[validate_password])
    password2 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = CustomUser
        fields = (
            'email',
            'first_name',
            'last_name',
            'password',
            'password2',
        )
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Password fields don't match."})
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class LoginSerializers(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField(required=True, write_only=True, validators=[validate_password])

    class Meta:
        fields = (
            'email',
            'password',
        )


class ChangePWSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(label="OldPassword", required=True, write_only=True)
    password1 = serializers.CharField(label="NewPassword", required=True, write_only=True, validators=[validate_password])
    password2 = serializers.CharField(label="ConfirmPassword", required=True, write_only=True)

    class Meta:
        model = CustomUser
        fields = (
            'old_password',
            'password1',
            'password2',
        )
    
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(ChangePWSerializer, self).__init__(*args, **kwargs)

    def validate_oldpw(self, value):
        user = self.request.user

        if not user.check_password(value):
            raise serializers.ValidationError(
                _("Old password is incorrect")
            )
        return value

    def validate(self, attrs):
        user = self.request.user

        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({'password2': _("The new passwords do not match.")})
        
        else:
            password = attrs['password1']
            user.set_password(password)
            user.save()

        validate_password(attrs(['password1']), self.request.user)

        return attrs

class UpdateUserSerializer(serializers.ModelSerializer):
    user_img = serializers.ImageField(required=False)
    alpha = RegexValidator(r'^[a-zA-Z]*$', 'Only alphabet characters are allowed.')
    first_name = serializers.CharField(label="First name", required=False, max_length=100, validators=[alpha])
    last_name = serializers.CharField(label="Last name", required=False, max_length=100, validators=[alpha])
    bio = serializers.CharField(default="Put your bio", required=False)

    class Meta:
        model = CustomUser
        fields = (
            'user_img',
            'first_name',
            'last_name',
            'bio',
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

class UserNBookSerializer(serializers.Serializer):
    users = UserSerializer()
    books = BookSerializer() 

    class Meta:
        fields = '__all__'