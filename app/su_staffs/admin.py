from django.contrib import admin
from import_export.admin import ImportExportMixin, ExportMixin
from .models import SU_Staff, School, Department
from .resource import SUStaffResource


# class SUStaffAdmin(ImportExportMixin, admin.ModelAdmin):
#     list_display = ['staff_id', 'name', 'title']
#     resource_class = SUStaffResource


@admin.register(SU_Staff)
class StaffAdmin(ImportExportMixin, admin.ModelAdmin):
    list_display = ['staff_id', 'title', 'name',
                    'status', 'dept_id', 'school_id']
    list_filter = ['dept_id', 'school_id', 'status']
    search_fields = ['staff_id', 'name']
    resource_class = SUStaffResource


# admin.site.register(SU_Staff, SUStaffAdmin)
admin.site.register(School)
admin.site.register(Department)
