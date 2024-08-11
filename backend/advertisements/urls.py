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
    path('set-primary-image/<int:advertisement_id>/<int:image_id>', views.SetAdvertisementPrimaryImageAPIView.as_view(), name='set_advertisement_primary_image'),
    path('delete-image/<int:image_id>', views.DeleteAdvertisementUploadedImageAPIView.as_view(), name='delete_advertisement_uploaded_image'),

    path('save/<int:advertisement_id>', views.SaveAdvertisementAPIView.as_view(), name='save_advertisement'),
    path('delete-saved/<int:advertisement_id>', views.DeleteSavedAdvertisementAPIView.as_view(), name='delete_saved_advertisement'),
    path('get-all-user-saved', views.GetUserSavedAdvertisementAPIView.as_view(), name='get_all_user_saved_advertisement'),
]