from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path("verify-number", views.verify_number, name='verify_number'),  
    path("complete-signup", views.signup, name='signup'),
    path("login", views.login, name='login'),
    path('auth', obtain_auth_token, name='auth'),
    path('am-i-in', views.am_i_in, name='am_i_in'),
    path('get-user-info', views.get_user_info, name='get_user_onfo')
]