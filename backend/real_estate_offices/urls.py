from django.urls import path

from . import views

urlpatterns = [
    path('', views.CreateSearchRealEstateOfficeAPIView.as_view(), name='create_search_real_estate_office'),

    path('<realestateoffice_username>', views.GetEditDeleteRealEstateOfficeAPIView.as_view(), name='get_edit_delete_real_estate_office'),
    path('<realestateoffice_username>/image', views.UploadDeleteRealEstateOfficeImageAPIView.as_view(), name='upload_delete_real_estate_office_image'),
    path('<realestateoffice_username>/bg-image', views.UploadDeleteRealEstateOfficeBGImageAPIView.as_view(), name='upload_delete_real_estate_office_bg_image'),

    path('<realestateoffice_username>/comments/<int:comment_id>', views.EditDeleteCommentAPIView.as_view(), name='edit_delete_comment_for_real_estate_office'),
    path('<realestateoffice_username>/comments/score-reasons', views.GetAllCommentScoreReasonAPIView.as_view(), name='getall_comment_score_reasons_for_real_estate_office'),
    path('<realestateoffice_username>/comments', views.CreateGetAllCommentAPIView.as_view(), name='create_getall_comment_for_real_estate_office'),

    
    path('<realestateoffice_username>/report', views.CreateReportAPIView.as_view(), name='create_real_estate_office_report'),
    path('<realestateoffice_username>/report/reasons', views.GetAllReportReasonsAPIView.as_view(), name='get_all_real_estate_office_report_reasons'),
]