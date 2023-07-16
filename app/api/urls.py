from django.urls import include, path
from rest_framework import routers
from .views import (
    SU_StaffViewSet,
    PublicationViewSet,
    GrantViewSet,
    SourceTitleCountAPIView,
	PublicationSourceAPIView,
	PublicationSourceYearCountAPIView
)


router = routers.DefaultRouter()
router.register(r"su_staffs", SU_StaffViewSet)
router.register(r"publications", PublicationViewSet)
router.register(r"grants", GrantViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "source-title-count/",
        SourceTitleCountAPIView.as_view(),
        name="source-title-count",
    ),
    path(
        "publication-source/",
        PublicationSourceAPIView.as_view(),
        name="publication-source",
    ),
    path(
        "publication-source-year/",
        PublicationSourceYearCountAPIView.as_view(),
        name="publication-source-year",
    ),
]
