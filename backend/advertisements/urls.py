from django.urls import path

from . import views

urlpatterns = [
    path('', views.CreateSearchAdvertisementAPIView.as_view(), name='create_search_advertisement'),
    path('choices', views.GetAllAdvertisementChoicesAPIView.as_view(), name='get_all_advertisement_choices'),
    path('<int:advertisement_id>', views.GetEditDeleteAdvertisementAPIView.as_view(), name='get_edit_delete_advertisement'),
    
    # self ads
    path('self', views.GetAllRealtorAdvertisementsAPIView.as_view(), name='get_all_realtor_advertisements'),
    path('<int:advertisement_id>/self', views.GetRealtorAdvertisementAPIView.as_view(), name='get_realtor_advertisement'),
    path('self-all', views.DeleteAllRealtorAdvertisementsAPIView.as_view(), name='delete_all_realtor_advertisements'),
    
    path('<int:advertisement_id>/image', views.UploadAdvertisementImageAPIView.as_view(), name='upload_advertisement_image'),
    path('<int:advertisement_id>/primary-image/<int:image_id>', views.SetAdvertisementPrimaryImageAPIView.as_view(), name='set_advertisement_primary_image'),
    path('image/<int:image_id>', views.DeleteAdvertisementUploadedImageAPIView.as_view(), name='delete_advertisement_uploaded_image'),

    path('<int:advertisement_id>/video', views.UploadAdvertisementVideoAPIView.as_view(), name='upload_advertisement_video'),
    path('video/<int:video_id>', views.DeleteAdvertisementVideoAPIView.as_view(), name='delete_advertisement_video'),

    path('<int:advertisement_id>/save', views.SaveUnsaveAdvertisementAPIView.as_view(), name='save_advertisement'),
    path('saved', views.GetUserSavedAdvertisementAPIView.as_view(), name='get_all_user_saved_advertisement'),
]