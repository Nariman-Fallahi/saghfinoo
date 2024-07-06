from django.urls import path

from . import views

urlpatterns = [
    path('create', views.CreateRealEstateOfficeAPIView.as_view(), name='create_real_estate_office'),
    path('edit', views.EditRealEstateOfficeAPIView.as_view(), name='eidit_real_estate_office'),
    path('get-all', views.GetAllRealEstateOfficeAPIView.as_view(), name='get_all_real_estate_offices'),
    path('get/<slug>', views.GetRealEstateOfficeAPIView.as_view(), name='get_real_estate_office'),
]