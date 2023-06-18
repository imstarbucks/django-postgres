import django_filters
from su_staffs.models import SU_Staff


class SU_StaffFilter(django_filters.FilterSet):
    dpet_id = django_filters.CharFilter(
        field_name='dpet_id__dpet_id', lookup_expr='iexact')
    school_id = django_filters.CharFilter(
        field_name='dpet_id__school_id__school_id', lookup_expr='iexact')

    class Meta:
        model = SU_Staff
        fields = ['dpet_id', 'school_id']
