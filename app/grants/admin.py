from django.contrib import admin
from import_export.admin import ImportExportMixin, ExportMixin
from .models import Grant, Sponsor
from .resources import GrantResource
from rangefilter.filters import DateRangeFilterBuilder
from su_staffs.models import SU_Staff


class GrantAdmin(ImportExportMixin, admin.ModelAdmin):
    filter_horizontal = ('collaborators',)
    list_display = ("project_code", "project_title", "grant_name", "sponsor", "su_staff"
                    )
    resource_class = GrantResource
    list_filter = ['sponsor', 'sponsor__sponsor_category',
                   ('project_end_date', DateRangeFilterBuilder())]
    search_fields = ['project_code', 'project_title',
                     'su_staff__name', 'su_staff__staff_id']
    search_help_text = "Searchable: Project Code, Project Title, SU Staff name"
    autocomplete_fields = ['su_staff']

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(collaborators=request.user.username) | qs.filter(su_staff=request.user.username)

    def get_school_id(self, obj):
        return obj.su_staff.dept_id.dept_id

    # get_dpet_id.short_description = "DPET"
    # get_school_id.short_description = "SCHOOL"


admin.site.register(Grant, GrantAdmin)
admin.site.register(Sponsor)
