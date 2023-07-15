from rest_framework import serializers
from su_staffs.models import SU_Staff, Department, School
from publications.models import Publication


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ("school_id", "school_name")


class SU_StaffSerializer(serializers.ModelSerializer):
    school_id = serializers.SerializerMethodField()

    def get_school_id(self, obj):
        return (
            obj.dpet_id.school_id.school_id
            if obj.dpet_id and obj.dpet_id.school_id
            else None
        )

    class Meta:
        model = SU_Staff
        fields = ("staff_id", "name", "title", "status", "dpet_id", "school_id")


class PublicationSerializer(serializers.ModelSerializer):
    su_staff = SU_StaffSerializer(many=True, read_only=True)

    class Meta:
        model = Publication
        fields = "__all__"
