"""rulegas_console URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.conf.urls.static import static
from rest_framework import routers


from . import settings

from rulegas import views
# from rulegas.serializers import FuelCompanyAwardViewSet


# Routers provide an easy way of automatically determining the URL conf.
# router = routers.DefaultRouter()
#
# router.register(r'api/award', FuelCompanyAwardViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', views.index, name='index'),

    path('users', views.users, name='users'),

    path('fuelstations', views.fuelstations, name='fuelstations'),

    path('awards/add', views.add_awards, name='awards.add'),
    path('awards/add_ind', views.add_awards_ind, name='awards.add_ind'),
    path('awards/list', views.list_awards, name='awards.list'),
    path('awards/edit', views.edit_awards, name='awards.edit'),

    # API ROUTES
    # path('api/', include(router.urls)),
    path('api/sellsdata', views.api_sells, name='api.sells.data'),

    path('api/awards/', views.api_award_id, name='api.awards.id', kwargs={'slug': ''}),
    path('api/awards/<str:award_id>', views.api_award_id, name='api.awards.id'),
    path('api/awards', views.api_award_save, name='api.awards.save'),
    path('api/awards_ind', views.api_award_ind_save, name='api.awards.save_ind'),

    path('<filename>.html', views.html),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
