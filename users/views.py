from pipes import Template
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.views.generic.base import TemplateView
# Create your views here.


class UserView(TemplateView):
    template_name = 'users/index.html'

class UserDetailView(TemplateView):
    template_name = 'users/profile.html'


class UserCreateView(TemplateView):
    template_name = 'users/register.html'


class UserUpdateView(TemplateView):
    template_name = 'users/update.html'


class UserDeleteView(TemplateView):
    template_name = 'users/delete.html'

class UserLoginView(TemplateView):
    template_name = 'users/login.html'

class UserChangePWView(TemplateView):
    template_name = 'users/change-password.html'

class UserSearchView(TemplateView):
    template_name = 'users/results.html'