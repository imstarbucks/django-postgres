from django.contrib import admin
from import_export.admin import ImportExportMixin, ExportMixin
from .models import Grant, Sponsor
from .resources import GrantResource


class GrantAdmin(ImportExportMixin, admin.ModelAdmin):
    list_display = ("project_code", "project_title", "grant_name", "sponsor",
                    )
    resource_class = GrantResource
    # list_filter = ['status', 'dpet_id__school_id', 'dpet_id__dpet_id']
    # search_fields = ['staff_id', 'name', 'author_name']

    # def get_dpet_id(self, obj):
    #     return obj.dpet_id.dpet_id

    # def get_school_id(self, obj):
    #     return obj.dpet_id.school_id.school_id

    # get_dpet_id.short_description = "DPET"
    # get_school_id.short_description = "SCHOOL"


admin.site.register(Grant, GrantAdmin)
admin.site.register(Sponsor)
