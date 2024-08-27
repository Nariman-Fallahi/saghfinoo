from django.urls import path

from . import views

urlpatterns = [
    path('create', views.CreateRealEstateOfficeAPIView.as_view(), name='create_real_estate_office'),
    path('edit/<int:real_estate_office_id>', views.EditRealEstateOfficeAPIView.as_view(), name='eidit_real_estate_office'),
    path('get-all', views.GetAllRealEstateOfficeAPIView.as_view(), name='get_all_real_estate_offices'),
    path('get/<slug>', views.GetRealEstateOfficeAPIView.as_view(), name='get_real_estate_office'),
    path('upload-image', views.UploadRealEstateOfficeImageAPIView.as_view(), name='upload_real_estate_office_image'),
    path('upload-bg-image', views.UploadRealEstateOfficeBGImageAPIView.as_view(), name='upload_real_estate_office_bg_image'),
    path('search', views.SearchRealEstateOfficesAPIView.as_view(), name='search_real_estate_office'),

    path('comment/create/<int:real_estate_office_id>', views.CreateCommentAPIView.as_view(), name='create_comment_for_real_estate_office'),
    path('comment/edit/<int:comment_id>', views.EditCommentAPIView.as_view(), name='edit_comment_for_real_estate_office'),
    path('comment/get-all/<int:real_estate_office_id>', views.GetAllCommentsAPIView.as_view(), name='get_all_comments_for_real_estate_office'),
    path('comment/delete/<int:comment_id>', views.DeleteCommentAPIVew.as_view(), name='delete_comment_for_real_estate_office'),

]