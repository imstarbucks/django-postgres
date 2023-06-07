from django.contrib import admin
from import_export.admin import ImportExportMixin
from .models import SU_Staff
from .resource import SUStaffResource


class SUStaffAdmin(ImportExportMixin, admin.ModelAdmin):
    list_display = ['staff_id', 'name', 'title']
    resource_class = SUStaffResource


admin.site.register(SU_Staff, SUStaffAdmin)
