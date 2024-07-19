from django.urls import path

from . import views

urlpatterns = [
    path('get-provinces', views.GetProvinces.as_view(), name='get_provinces'),
    path('get-province-cities/<province_id>', views.GetProvinceCities.as_view(), name='get_province_cities'),
]