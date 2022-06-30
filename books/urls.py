from django.urls import path
from . import views, api

app_name = 'books'
urlpatterns = [
    path('api/data/', api.BookViewSet.as_view({'get': 'get_books'})),
    path('api/detail/<int:id>', api.BookViewSet.as_view({'get': 'get_books_detail'})),
    path('api/update/<int:id>', api.BookViewSet.as_view({'put': 'put_books_detail'})),
    path('api/delete/<int:id>', api.BookViewSet.as_view({'delete': 'delete_book_detail'})),
    path('', views.BooksView.as_view(), name='books-index'),
    path('detail/<int:id>/', views.BooksDetailView.as_view(), name='books-index'),
]
