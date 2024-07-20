from django.urls import path

from . import views

urlpatterns = [
    path('create', views.CreateRealtor.as_view(), name='create_realtor'),
    path('get-all', views.GetAllRealtorAPIView.as_view(), name='get_all_realtor'),
    path('get/<realtor_id>', views.GetRealtorAPIView.as_view(), name='get_realtor'),
]