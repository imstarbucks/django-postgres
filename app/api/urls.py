from django.urls import include, path
from rest_framework import routers
from .views import SU_StaffViewSet, PublicationViewSet


router = routers.DefaultRouter()
router.register(r"su_staffs", SU_StaffViewSet)
router.register(r"publications", PublicationViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
