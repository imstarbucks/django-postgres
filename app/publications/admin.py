from django.contrib import admin
from rangefilter.filters import DateRangeFilterBuilder
from import_export.admin import ImportExportMixin, ExportMixin
from su_staffs.models import Department, School
from .models import Publisher, Publication, ScopusPublication, WOSPublication
from .resource import ScopusPublicationResource, WOSPublicationResource
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
# class PublicationInline(admin.TabularInline):
#     model = Publication
#     max_num = 1
#     autocomplete_fields = ["scopus_publication", "wos_publication"]
# class WOSPublicationAdmin(ImportExportMixin, admin.ModelAdmin):
#     filter_horizontal = ('su_staff',)
#     resource_class = WOSPublicationResource
#     list_display = ('wos_id', 'doi', 'authors', 'published_year', 'get_su_staff')
#     list_filter = ['doc_types', 'published_year', 'source_title']
#     search_fields=['su_staff__name', 'su_staff__staff_id', 'wos_id', 'doi']
#     search_help_text = "Searchable: SU Staff name, SU Staff ID, eid, doi"
#     readonly_fields = ["source"]
#     inlines = [PublicationInline]

#     def get_su_staff(self, obj):
#         return ', '.join([str(staff) for staff in obj.su_staff.all()])

    # def save_model(self, request, obj, form, change):
    #     super().save_model(request, obj, form, change)
    #     if obj.doi and obj.doi.strip():
    #         try:
    #             scopus_publication = Publication.objects.get(scopus_publication__doi=obj.doi)
    #             set_publication_source = Publication.PublicationSourceChoices.SCOPUSWOS
    #             scopus_publication.wos_publication = obj
    #             scopus_publication.publication_source = set_publication_source
    #             scopus_publication.save()

    #         except Publication.DoesNotExist:
    #             set_publication_source = Publication.PublicationSourceChoices.WOS
    #             Publication.objects.create(
    #                 wos_publication=obj,
    #                 publication_source=set_publication_source
    #             )
    #     else :
    #         set_publication_source = Publication.PublicationSourceChoices.WOS
    #         Publication.objects.create(
    #             wos_publication=obj,
    #             publication_source=set_publication_source
    #         )

    # get_su_staff.short_description = 'SU Staff'



# class ScopuesPublicationAdmin(ImportExportMixin, admin.ModelAdmin):
#     filter_horizontal = ('su_staff',)
#     resource_class = ScopusPublicationResource
#     list_display = ('eid', 'doi', 'authors', 'published_year', 'get_su_staff')
#     list_filter = ['doc_types', 'published_year', 'source_title']
#     search_fields=['su_staff__name', 'su_staff__staff_id', 'eid', 'doi']
#     search_help_text = "Searchable: SU Staff name, SU Staff ID, eid, doi"
#     readonly_fields = ["source"]
#     inlines = [PublicationInline]

#     def get_su_staff(self, obj):
#         return ', '.join([str(staff) for staff in obj.su_staff.all()])

    # def save_model(self, request, obj, form, change):
    #     super().save_model(request, obj, form, change)
    #     if obj.doi and obj.doi.strip():
    #         try:
    #             wos_publication = Publication.objects.get(wos_publication__doi=obj.doi)
    #             set_publication_source = Publication.PublicationSourceChoices.SCOPUSWOS
    #             wos_publication.scopus_publication = obj
    #             wos_publication.publication_source = set_publication_source
    #             wos_publication.save()

    #         except Publication.DoesNotExist:
    #             set_publication_source = Publication.PublicationSourceChoices.SCOPUS

    #             Publication.objects.create(
    #                 scopus_publication=obj,
    #                 publication_source=set_publication_source
    #             )

    #     else :
    #         set_publication_source = Publication.PublicationSourceChoices.SCOPUS
    #         Publication.objects.create(
    #             scopus_publication=obj,
    #             publication_source=set_publication_source
    #         )

    # get_su_staff.short_description = 'SU Staff'
class SchoolFilter(admin.SimpleListFilter):
    title = 'School'
    parameter_name = 'school_id'

    def lookups(self, request, model_admin):
        schools = School.objects.distinct('school_id')
        return [(school.school_id, school.school_name) for school in schools]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(su_staff__dpet_id__school_id=self.value()).distinct()
        return queryset

class PublicationInline(admin.TabularInline):
    model = Publication
    max_num = 1
    filter_vertical = ('su_staff',)

class ScopusAdmin(admin.ModelAdmin):
    search_fields = ["eid", "link"]
    inlines = [PublicationInline]

class WOSAdmin(admin.ModelAdmin):
    search_fields = ["wos_id", "link"]
    inlines = [PublicationInline]

class PublicationAdmin(ImportExportMixin,admin.ModelAdmin):
    list_display = ('title', 'source_title', 'doc_types', 'publication_source', 'published_year')
    search_fields = ['doi', 'su_staff__name', 'su_staff__staff_id']
    list_filter = ['publication_source', SchoolFilter,('published_year', DateRangeFilterBuilder())]
    autocomplete_fields = ["scopus_publication", "wos_publication"]
    filter_horizontal = ('su_staff',)
    resource_classes = [ScopusPublicationResource, WOSPublicationResource]
    readonly_fields = ["publication_source"]
    ordering = ["published_year"]

admin.site.register(Publisher)
admin.site.register(ScopusPublication, ScopusAdmin)
admin.site.register(WOSPublication, WOSAdmin)
admin.site.register(Publication, PublicationAdmin)
