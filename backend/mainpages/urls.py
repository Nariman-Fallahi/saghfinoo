from django.urls import path

from . import views

urlpatterns = [
    path('', views.GetMainpageAPIView.as_view(), name='get_mainpage')
]