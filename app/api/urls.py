from django.urls import include, path
from rest_framework import routers
from api.views import SU_StaffViewSet

router = routers.DefaultRouter()
router.register(r'su_staffs', SU_StaffViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
