from django.contrib import admin
from rangefilter.filters import DateRangeFilterBuilder
from import_export.admin import ImportExportMixin, ExportMixin
from .models import Publisher, ScopusPublication
from .resource import PublicationResource


class ScopuesPublicationAdmin(ImportExportMixin, admin.ModelAdmin):
    filter_horizontal = ('su_staff',)
    resource_class = PublicationResource
    list_display = ('eid', 'doi', 'publisher_name', 'doc_types')
    list_filter = ['doc_types', 'published_year', 'source_title']

admin.site.register(Publisher)
admin.site.register(ScopusPublication, ScopuesPublicationAdmin)
