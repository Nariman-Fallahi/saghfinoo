from django.urls import path

from . import views

urlpatterns = [
    path('provinces', views.GetProvincesAPIView.as_view(), name='get_provinces'),
    path('provinces/<province_id>/cities', views.GetProvinceCitiesAPIView.as_view(), name='get_province_cities'),
    path('cities', views.SearchCitiesAPIVew.as_view(), name='search_cities'),    
]