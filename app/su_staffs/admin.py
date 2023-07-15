from django.contrib import admin
from import_export.admin import ImportExportMixin, ExportMixin
from .models import SU_Staff, Department, School
from .resource import SUStaffResource
from publications.models import Publication


class PublicationInline(admin.TabularInline):
    model = Publication.su_staff.through
    # autocomplete_fields = ['publications']


class StaffAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = SUStaffResource
    list_display = (
        "staff_id",
        "name",
        "author_name",
        "title",
        "status",
        "get_dpet_id",
        "get_school_id",
    )
    list_filter = ["status", "dpet_id__school_id", "dpet_id__dpet_id"]
    search_fields = ["staff_id", "name", "author_name"]
    search_help_text = (
        "Searchable: SU Staff ID, SU Staff Name, SU Staff author name format"
    )
    inlines = [PublicationInline]
    autocomplete_fields = ["publications", "user"]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

    def get_dpet_id(self, obj):
        return obj.dpet_id.dpet_id

    def get_school_id(self, obj):
        return obj.dpet_id.school_id.school_id

    get_dpet_id.short_description = "DPET"
    get_school_id.short_description = "SCHOOL"


admin.site.register(SU_Staff, StaffAdmin)
admin.site.register(School)
admin.site.register(Department)
