from su_staffs.models import SU_Staff
from publications.models import Publication
from grants.models import Grant
from .serializers import (
    SU_StaffSerializer,
    PublicationSerializer,
    GrantSerializer,
    SourceTitleCountSerializer,
)
from .filters import SU_StaffFilter, PublicationFilter, GrantFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework import viewsets, generics
from rest_framework.response import Response

# from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count


class SU_StaffViewSet(viewsets.ModelViewSet):
    queryset = SU_Staff.objects.all()
    serializer_class = SU_StaffSerializer
    filterset_class = SU_StaffFilter
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = super().get_queryset()

        # Apply filtering based on query parameters
        queryset = self.filterset_class(self.request.GET, queryset=queryset).qs

        return queryset


class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    filterset_class = PublicationFilter

    def get_queryset(self):
        queryset = super().get_queryset()

        # Apply filtering based on query parameters
        queryset = self.filterset_class(self.request.GET, queryset=queryset).qs

        return queryset

    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]


class GrantViewSet(viewsets.ModelViewSet):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializer
    filterset_class = GrantFilter

    def get_queryset(self):
        queryset = super().get_queryset()

        # Apply filtering based on query parameters
        queryset = self.filterset_class(self.request.GET, queryset=queryset).qs

        return queryset


class SourceTitleCountAPIView(generics.ListAPIView):
    serializer_class = SourceTitleCountSerializer

    def get_queryset(self):
        queryset = Publication.objects.values("source_title").annotate(
            count=Count("source_title")
        )

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
