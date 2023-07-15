from rest_framework import serializers
from su_staffs.models import SU_Staff, Department, School
from publications.models import Publication, Publisher
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


class SU_StaffSerializer(serializers.ModelSerializer):
    school_id = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    def get_school_id(self, obj):
        return (
            obj.dpet_id.school_id.school_id
            if obj.dpet_id and obj.dpet_id.school_id
            else None
        )

    class Meta:
        model = SU_Staff
        fields = "__all__"


class PublicationSerializer(serializers.ModelSerializer):
    su_staff = SU_StaffSerializer(many=True, read_only=True)
    publisher_name = PublisherSerializer(read_only=True)

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
