from django.urls import path

from . import views

urlpatterns = [
    path('create', views.CreateAdvertisementAPIView.as_view(), name='create_advertisement'),
    path('get-all', views.GetAllAdvertisementsAPIView.as_view(), name='get_all_advertisements'),
    path('get/<advertisement_id>', views.GetAdvertisementAPIView.as_view(), name='get_advertisement'),
    path('search', views.SearchAdvertisementsAPIView.as_view(), name='search_advertisements'),
    path('upload-image/<int:advertisement_id>', views.UploadAdvertisementImageAPIView.as_view(), name='upload_advertisement_image'),
    path('edit/<int:advertisement_id>', views.EditAdvertisementAPIView.as_view(), name='edit_advertisement'),
    path('get-all-for-realtor', views.GetAllRealtorAdvertisementsAPIView.as_view(), name='get_all_realtor_advertisements'),
    path('get-for-realtor/<int:advertisement_id>', views.GetRealtorAdvertisementAPIView.as_view(), name='get_realtor_advertisement'),
    path('delete-all-for-realtor', views.DeleteAllRealtorAdvertisementsAPIView.as_view(), name='delete_all_realtor_advertisements'),
    path('delete/<int:advertisement_id>', views.DeleteAdvertisementAPIView.as_view(), name='delete_advertisement'),
]