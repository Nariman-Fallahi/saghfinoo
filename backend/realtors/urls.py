from django.urls import path

from . import views

urlpatterns = [
    path('', views.CreateSearchRealtor.as_view(), name='create_realtor'),
    path('<realtor_id>', views.GetEditDeleteRealtorAPIView.as_view(), name='get_realtor'),
    
    path('<int:realtor_id>/comments', views.CreateGetAllCommentAPIView.as_view(), name='create_comment_for_realtor'),
    path('comments/<int:comment_id>', views.EditDeleteCommentAPIView.as_view(), name='edit_comment_for_realtor'),

    path('comments/score-reasons', views.GetAllCommentScoreReasonAPIView.as_view(), name='get_all_comment_score_reasons_for_realtor'),

    path('<int:realtor_id>/report', views.CreateReportAPIView.as_view(), name='create_realtor_report'),
    path('report/reasons', views.GetAllReportReasonsAPIView.as_view(), name='get_all_realtor_report_reasons'),
]