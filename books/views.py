from django.shortcuts import render
from django.views.generic.base import TemplateView


# Create your views here.


class BooksView(TemplateView):
    template_name = 'books/index.html'

class BooksDetailView(TemplateView):
    template_name = 'books/detail.html'

class BooksCreateView(TemplateView):
    template_name = "books/register-book.html"