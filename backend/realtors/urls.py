from django.urls import path

from . import views

urlpatterns = [
    path('create', views.CreateRealtor.as_view(), name='create_realtor'),
    path('get-all', views.GetAllRealtorAPIView.as_view(), name='get_all_realtors'),
    path('get/<realtor_id>', views.GetRealtorAPIView.as_view(), name='get_realtor'),
    path('search', views.SearchRealtorsAPIView.as_view(), name='search_realtors'),
    
    path('comment/create/<int:realtor_id>', views.CreateCommentAPIView.as_view(), name='create_comment_for_realtor'),
    path('comment/edit/<int:comment_id>', views.EditCommentAPIView.as_view(), name='edit_comment_for_realtor'),
    path('comment/get-all/<int:realtor_id>', views.GetAllRealtorCommentsAPIView.as_view(), name='get_all_comments_for_realtor'),
    path('comment/delete/<int:comment_id>', views.DeleteCommentAPIVew.as_view(), name='delete_comment_for_realtor'),

    path('comment/get-all-score-reasons', views.GetAllCommentScoreReasonAPIView.as_view(), name='get_all_comment_score_reasons_for_realtor'),

    path('report/create', views.CreateReportAPIView.as_view(), name='create_realtor_report'),
    path('report/get-all-reasons', views.GetAllReportReasonsAPIView.as_view(), name='get_all_realtor_report_reasons'),
]