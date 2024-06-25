from django.urls import path

from . import views

urlpatterns = [
    path("verify-number", views.verify_number)    
]