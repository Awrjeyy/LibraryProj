from django.urls import path
from . import views, api

app_name = 'books'
urlpatterns = [
    path('api/data/', api.BookViewSet.as_view({'get': 'get_books'})),
    path('api/detail/<int:id>', api.BookViewSet.as_view({'get': 'get_books_detail'})),
    path('api/update/<int:id>', api.BookViewSet.as_view({'post': 'put_books_detail'})),
    path('api/delete/<int:id>', api.BookViewSet.as_view({'delete': 'delete_book_detail'})),
    path('api/like/<int:id>', api.BookViewSet.as_view({'post': 'post_likes'})),
    path('api/unlike/<int:id>', api.BookViewSet.as_view({'delete': 'remove_likes'})),
    path('api/borrowed-book/<int:id>', api.BookAvailViewSet.as_view({'get': 'get_borrowed_book'})),
    path('api/borrow/<int:id>', api.BookAvailViewSet.as_view({'post': 'borrow_book'})),
    path('api/return/<int:id>', api.BookAvailViewSet.as_view({'post': 'return_book'})),
    path('api/create/', api.BookViewSet.as_view({'post': 'post_books'})),
    path('api/display/<int:id>', api.BookCommentViewSet.as_view({'get': 'get_comments'})),
    path('api/create-comment/', api.BookCommentViewSet.as_view({'post': 'post_comments'})),
    path('', views.BooksView.as_view(), name='books-index'),
    path('detail/<int:id>/', views.BooksDetailView.as_view(), name='books-detail'),
    path('update/<int:id>/', views.BooksUpdateView.as_view(), name='books-update'),
    path('create/', views.BooksCreateView.as_view(), name="books-create"),
]
