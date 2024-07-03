"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

schema_view = get_schema_view(
    openapi.Info(
        title="Saghfinoo API Doc",
        default_version='v1',
        description='Saghfinoo API Documentation',

    ),

    public=True,
    permission_classes=[AllowAny] # todo replace with IsAdmin
)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name="schema_json"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema_swagger_ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema_redoc_ui'),

    path('api/v1/users/', include("users.urls")),
    path('api/v1/real-estate-offices/', include('real_estate_offices.urls')),
    path('api/v1/real-estate-agents/', include('real_estate_agents.urls')),
    path('api/v1/news/', include('news.urls')),
    path('api/v1/real-estates', include('real_estates.urls')),
]

if not settings.TESTING:
    urlpatterns += [path('__debug__', include('debug_toolbar.urls'))]
    
