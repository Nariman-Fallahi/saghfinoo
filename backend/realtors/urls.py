from django.urls import path

from . import views

urlpatterns = [
    path('create', views.CreateRealtor.as_view(), name='create_realtor'),
]