from django.contrib import admin
from rangefilter.filters import DateRangeFilterBuilder
from import_export.admin import ImportExportMixin, ExportMixin
from .models import Publisher, ScopusPublication, WOSPublication, Publication
from .resource import ScopusPublicationResource, WOSPublicationResource



class WOSPublicationAdmin(ImportExportMixin, admin.ModelAdmin):
    filter_horizontal = ('su_staff',)
    resource_class = WOSPublicationResource
    list_display = ('wos_id', 'doi', 'authors', 'published_year', 'get_su_staff')
    list_filter = ['doc_types', 'published_year', 'source_title']
    search_fields=['su_staff__name', 'su_staff__staff_id', 'wos_id', 'doi']
    search_help_text = "Searchable: SU Staff name, SU Staff ID, WOS ID, DOI"

    def get_su_staff(self, obj):
        return ', '.join([str(staff) for staff in obj.su_staff.all()])

    get_su_staff.short_description = 'SU Staff'

class ScopuesPublicationAdmin(ImportExportMixin, admin.ModelAdmin):
    filter_horizontal = ('su_staff',)
    resource_class = ScopusPublicationResource
    list_display = ('eid', 'doi', 'authors', 'published_year', 'get_su_staff')
    list_filter = ['doc_types', 'published_year', 'source_title']
    search_fields=['su_staff__name', 'su_staff__staff_id', 'eid', 'doi']
    search_help_text = "Searchable: SU Staff name, SU Staff ID, WOS ID, DOI"

    def get_su_staff(self, obj):
        return ', '.join([str(staff) for staff in obj.su_staff.all()])

    get_su_staff.short_description = 'SU Staff'

class PublicationAdmin(admin.ModelAdmin):
    list_filter = ['publication_source']


admin.site.register(Publisher)
admin.site.register(Publication, PublicationAdmin)
admin.site.register(ScopusPublication, ScopuesPublicationAdmin)
admin.site.register(WOSPublication, WOSPublicationAdmin)
