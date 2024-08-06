from django.urls import path

from . import views

urlpatterns = [
    path('create', views.CreateAdvertisementAPIView.as_view(), name='create_real_estate'),
    path('get-all', views.GetAllAdvertisementsAPIView.as_view(), name='get_all_real_estates'),
    path('get/<advertisement_id>', views.GetAdvertisementAPIView.as_view(), name='get_real_estate'),
    path('search', views.SearchAdvertisementsAPIView.as_view(), name='search_real_estates'),
    path('upload-image/<int:advertisement_id>', views.UploadAdvertisementImageAPIView.as_view(), name='upload_real_estate_image'),
    path('edit/<int:advertisement_id>', views.EditAdvertisementAPIView.as_view(), name='edit_real_estate'),
]