from rest_framework import serializers
from su_staffs.models import SU_Staff


class SU_StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = SU_Staff
        fields = '__all__'
