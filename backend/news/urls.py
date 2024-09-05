from django.urls import path

from . import views

urlpatterns = [
    path('', views.SearchNewsAPIView.as_view(), name='search_news'),
    path('categories', views.GetAllCategoriesAPIView.as_view(), name='get_all_categories'),
    path('<slug>/image', views.UploadNewsImageAPIView.as_view(), name='upload_news_image'),
    path('<slug>', views.CreateGetNewsAPIView.as_view(), name='create_get_news'),    
]   