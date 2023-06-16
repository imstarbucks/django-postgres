from rest_framework import viewsets
from su_staffs.models import SU_Staff
from api.serializers import SU_StaffSerializer


class SU_StaffViewSet(viewsets.ModelViewSet):
    queryset = SU_Staff.objects.all()
    serializer_class = SU_StaffSerializer
