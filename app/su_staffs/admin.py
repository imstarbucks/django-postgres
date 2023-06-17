from django.contrib import admin
from import_export.admin import ImportExportMixin, ExportMixin
from .models import SU_Staff
from .resource import SUStaffResource


# class SUStaffAdmin(ImportExportMixin, admin.ModelAdmin):
#     list_display = ['staff_id', 'name', 'title']
#     resource_class = SUStaffResource


class StaffAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = SUStaffResource
    list_display = ("staff_id", "name", "title",
                    "status")


# admin.site.register(SU_Staff, SUStaffAdmin)
admin.site.register(SU_Staff, StaffAdmin)
# admin.site.register(School)
# admin.site.register(Department)
