from django.urls import path, include
from . import views, api
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'users'
urlpatterns = [
    path('api/data/', api.UserViewset.as_view({'get': 'get_users'}) ),
    path('api/create/', api.UserViewset.as_view({'post': 'create_user'}) ),
    path('api/update/<int:id>/', api.UpdateUserViewset.as_view({'post': 'updateuser'}) ),
    path('api/detail/<int:id>/', api.UserViewset.as_view({'get': 'get_detail_user'}) ),
    path('api/delete/<int:id>/', api.UserViewset.as_view({'delete': 'delete_user'}) ),
    path('api/change-password/<int:id>/', api.ChangePassViewset.as_view({'post': 'changepassword'}) ),
    path('api/login/', api.UserViewset.as_view({'post': 'userlogin'}) ),
    path('api/logout/', api.UserViewset.as_view({'get': 'userlogout'})),
    path('api/search/', api.SearchViewset.as_view({'get': 'searchuser'}) ),
    path('', views.UserView.as_view(), name="users-index"),
    path('register/', views.UserCreateView.as_view(), name="users-profile"),
    path('profile/<int:id>/', views.UserDetailView.as_view(), name="users-detail"),
    path('update/<int:id>/', views.UserUpdateView.as_view(), name="users-update"),
    path('login/', views.UserLoginView.as_view(), name="users-login"),
    path('change-password/<int:id>/', views.UserChangePWView.as_view(), name="users-change-password"),
    path('search/', views.UserSearchView.as_view(), name="users-search" ),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)