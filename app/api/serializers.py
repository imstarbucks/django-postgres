from rest_framework import serializers
from su_staffs.models import SU_Staff, Department, School
from publications.models import (
    Publication,
    Publisher,
    WOSPublication,
    ScopusPublication,
)
from grants.models import Grant
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        User = get_user_model()
        model = User
        fields = (
            "email",
            "phone",
            "biography",
            "scopus_link",
            "linkedin_link",
            "profile_image",
            "cv",
        )
        abstract = True


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ("publisher_name",)


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ("school_id", "school_name")

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("dpet_id", "dpet_name")


class PureSU_StaffSerializer(serializers.ModelSerializer):
    school_id = serializers.SerializerMethodField()

    def get_school_id(self, obj):
        return (
            obj.dpet_id.school_id.school_id
            if obj.dpet_id and obj.dpet_id.school_id
            else None
        )

    class Meta:
        model = SU_Staff
        fields = ("staff_id", "name", "school_id")


class SU_StaffSerializer(serializers.ModelSerializer):
    school_id = SchoolSerializer(read_only=True)
    dpet_id = DepartmentSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = SU_Staff
        fields = "__all__"


class WOSSerializer(serializers.ModelSerializer):
    class Meta:
        model = WOSPublication
        fields = "__all__"


class ScopusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScopusPublication
        fields = "__all__"


class PublicationSerializer(serializers.ModelSerializer):
    su_staff = PureSU_StaffSerializer(many=True, read_only=True)
    publisher_name = PublisherSerializer(read_only=True)
    wos_publication = WOSSerializer(read_only=True)
    scopus_publication = ScopusSerializer(read_only=True)

    class Meta:
        model = Publication
        fields = "__all__"


class GrantSerializer(serializers.ModelSerializer):
    su_staff = SU_StaffSerializer(read_only=True)
    collaborators = SU_StaffSerializer(many=True, read_only=True)

    class Meta:
        model = Grant
        fields = "__all__"


class SourceTitleCountSerializer(serializers.Serializer):
    source_title = serializers.CharField()
    count = serializers.IntegerField()

class PublicationSourceSerializer(serializers.ModelSerializer):
    publication_source = serializers.ChoiceField(choices=Publication.PublicationSourceChoices.choices)

    class Meta:
        model = Publication
        fields = ['publication_source']

class PublicationCountSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    scopus = serializers.IntegerField()
    wos = serializers.IntegerField()
    total = serializers.IntegerField()
