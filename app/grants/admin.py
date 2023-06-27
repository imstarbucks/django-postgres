from django.contrib import admin
from import_export.admin import ImportExportMixin, ExportMixin
from .models import Grant, Sponsor
from .resources import GrantResource
from rangefilter.filters import DateRangeFilterBuilder


class GrantAdmin(ImportExportMixin, admin.ModelAdmin):
    list_display = ("project_code", "project_title", "grant_name", "sponsor", "su_staff"
                    )
    resource_class = GrantResource
    list_filter = ['sponsor', 'sponsor__sponsor_category',
                   ('project_end_date', DateRangeFilterBuilder())]
    search_fields = ['project_code', 'project_title', 'su_staff__name']

    def get_sponsor_category(self, obj):
        return obj.sponsor.sponsor_category

    # def get_school_id(self, obj):
    #     return obj.dpet_id.school_id.school_id

    # get_dpet_id.short_description = "DPET"
    # get_school_id.short_description = "SCHOOL"


admin.site.register(Grant, GrantAdmin)
admin.site.register(Sponsor)
