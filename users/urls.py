from django.urls import path
from . import views, api
from django.conf import settings
from django.conf.urls.static import static

app_name = 'users'
urlpatterns = [
    path('api/data/', api.UserViewset.as_view({'get': 'get_users'}) ),
    path('api/create/', api.UserViewset.as_view({'post': 'create_user'}) ),
    path('api/update/<int:id>/', api.UserViewset.as_view({'put': 'put_detail_user'}) ),
    path('api/detail/<int:id>/', api.UserViewset.as_view({'get': 'get_detail_user'}) ),
    path('api/delete/<int:id>/', api.UserViewset.as_view({'delete': 'delete_user'}) ),
    path('', views.UserView.as_view(), name="users-index"),
    path('create/', views.UserCreateView.as_view(), name="users-create"),
    path('detail/<int:id>/', views.UserDetailView.as_view(), name="users-detail"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)