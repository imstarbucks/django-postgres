import django_filters
from su_staffs.models import SU_Staff
from publications.models import Publication
from grants.models import Grant


class SU_StaffFilter(django_filters.FilterSet):
    dpet_id = django_filters.CharFilter(
        field_name="dpet_id__dpet_id", lookup_expr="iexact"
    )
    school_id = django_filters.CharFilter(
        field_name="dpet_id__school_id__school_id", lookup_expr="iexact"
    )
    staff_id = django_filters.CharFilter(field_name="staff_id", lookup_expr="iexact")

    class Meta:
        model = SU_Staff
        fields = ["dpet_id", "school_id", "staff_id"]


class PublicationFilter(django_filters.FilterSet):
    latest_publication = django_filters.NumberFilter(method="filter_latest_publication")
    published_year = django_filters.DateFromToRangeFilter(field_name="published_year")
    title = django_filters.CharFilter(field_name="title", lookup_expr="icontains")

    def filter_latest_publication(self, queryset, name, value):
        # Check if the 'latest_publication' query parameter is provided
        if value:
            # Filter the queryset to get the top 'value' number of publications based on the 'published_year' field in descending order
            queryset = queryset.order_by("-published_year")[:value]

        return queryset

    class Meta:
        model = Publication
        fields = ["published_year"]


class GrantFilter(django_filters.FilterSet):
    latest_grant = django_filters.NumberFilter(method="filter_latest_grant")
    project_end_date = django_filters.DateFromToRangeFilter(
        field_name="project_end_date"
    )

    def filter_latest_grant(self, queryset, name, value):
        if value:
            queryset = queryset.order_by("-project_end_date")[:value]

        return queryset
