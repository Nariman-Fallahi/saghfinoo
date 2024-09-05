from django.urls import path

from . import views

urlpatterns = [
    path('', views.SearchNewsAPIView.as_view(), name='search_news'),
    path('<slug>', views.CreateGetNewsAPIView.as_view(), name='create_get_news'),    
]