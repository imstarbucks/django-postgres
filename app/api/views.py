from rest_framework import viewsets, generics
from su_staffs.models import SU_Staff
from api.serializers import SU_StaffSerializer
from .filters import SU_StaffFilter
from django_filters.rest_framework import DjangoFilterBackend


class SU_StaffViewSet(viewsets.ModelViewSet):
    queryset = SU_Staff.objects.all()
    serializer_class = SU_StaffSerializer
    filterset_class = SU_StaffFilter

    def get_queryset(self):
        queryset = super().get_queryset()

        # Apply filtering based on query parameters
        queryset = self.filterset_class(self.request.GET, queryset=queryset).qs

        return queryset
