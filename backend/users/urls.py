from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenBlacklistView, TokenRefreshView
from . import views

urlpatterns = [
    path('login', views.CustomTokenObtainPairView.as_view(), name="login"),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    path("verify-number", views.VerifyNumberAPIView.as_view(), name='verify_number'),  
    path("complete-signup", views.SignupAPIView.as_view(), name='signup'),
    # path("login", views.login, name='login'),
    path('auth', obtain_auth_token, name='auth'),
    path('am-i-in', views.AmIInAPIView.as_view(), name='am_i_in'),
    path('get-user-info', views.GetUserInfoAPIView.as_view(), name='get_user_info'),
    path('logout', TokenBlacklistView.as_view(), name='logout'),
    path('upload-profile-image', views.UploadProfileImageAPIView.as_view(), name='upload_profile_image'),
    path('change-password', views.ChangePasswordAPIView.as_view(), name='change_password'),
    path('edit-user', views.EditUserAPIView.as_view(), name='edit_user'),
]