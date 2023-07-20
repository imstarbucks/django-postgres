from su_staffs.models import SU_Staff, School
from publications.models import Publication
from grants.models import Grant
from .serializers import (
    SU_StaffSerializer,
	SchoolSerializer,
    PublicationSerializer,
    GrantSerializer,
    SourceTitleCountSerializer,
	PublicationCountSerializer
)
from .filters import SU_StaffFilter, PublicationFilter, GrantFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework import viewsets, generics, views
from rest_framework.response import Response
# from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, Q
from django.db.models.functions import ExtractYear

class SchoolsViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.exclude(school_id="NO_SCHOOL")

class SU_StaffViewSet(viewsets.ModelViewSet):
    queryset = SU_Staff.objects.all()
    serializer_class = SU_StaffSerializer
    filterset_class = SU_StaffFilter
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = super().get_queryset()

        # Apply filtering based on query parameters
        queryset = self.filterset_class(self.request.GET, queryset=queryset).qs

        return queryset


class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    filterset_class = PublicationFilter
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = super().get_queryset()

        # Apply filtering based on query parameters
        queryset = self.filterset_class(self.request.GET, queryset=queryset).qs

        return queryset



class GrantViewSet(viewsets.ModelViewSet):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializer
    filterset_class = GrantFilter
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = super().get_queryset()

        # Apply filtering based on query parameters
        queryset = self.filterset_class(self.request.GET, queryset=queryset).qs

        return queryset


class SourceTitleCountAPIView(generics.ListAPIView):
    serializer_class = SourceTitleCountSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = Publication.objects.values("source_title").annotate(
            count=Count("source_title")
        )

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class PublicationSourceAPIView(generics.ListAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # Count occurrences of each publication source
        source_counts = (
            queryset.filter(
                Q(publication_source='SCOPUS') | Q(publication_source='WOS') | Q(publication_source='SCOPUSWOS')
            )
            .values('publication_source')
            .annotate(count=Count('publication_source'))
        )

        # Format the response data
        response_data = []
        for count in source_counts:
            source = count['publication_source']
            if source == 'SCOPUSWOS':
                response_data.append({'source': 'SCOPUS', 'count': count['count']})
                response_data.append({'source': 'WOS', 'count': count['count']})
            else:
                response_data.append({'source': source, 'count': count['count']})

        return Response(response_data)

class PublicationSourceYearCountAPIView(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        queryset = Publication.objects.exclude(published_year__isnull=True).annotate(
            year=ExtractYear('published_year')
        ).values('year').annotate(
            scopus=Count('id', filter=Q(publication_source='SCOPUS') | Q(publication_source='SCOPUS & WOS')),
            wos=Count('id', filter=Q(publication_source='WOS') | Q(publication_source='SCOPUS & WOS')),
            total=Count('id')
        ).order_by('year')

        serializer = PublicationCountSerializer(queryset, many=True)

        return Response(serializer.data)
