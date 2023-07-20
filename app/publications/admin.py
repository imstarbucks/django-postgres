from django.contrib import admin
from rangefilter.filters import DateRangeFilterBuilder
from import_export.admin import ImportExportMixin, ExportMixin
from su_staffs.models import Department, School
from .models import Publisher, Publication, ScopusPublication, WOSPublication
from .resource import ScopusPublicationResource, WOSPublicationResource, ExportPublicationResource
from django.contrib import admin
from django.utils.translation import gettext_lazy as _

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
    resource_classes = [ScopusPublicationResource, WOSPublicationResource, ExportPublicationResource]
    readonly_fields = ["publication_source"]
    ordering = ["published_year"]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(su_staff=request.user.username)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if(obj.scopus_publication and obj.wos_publication):
            obj.publication_source = Publication.PublicationSourceChoices.SCOPUSWOS
            obj.save()
            return
        if(obj.scopus_publication):
            obj.publication_source = Publication.PublicationSourceChoices.SCOPUS
            obj.save()
            return
        if(obj.wos_publication):
            obj.publication_source = Publication.PublicationSourceChoices.WOS
            obj.save()
            return
        else :
            set_publication_source = Publication.PublicationSourceChoices.BLANK
            Publication.objects.create(
                publication_source=set_publication_source
            )

admin.site.register(Publisher)
admin.site.register(ScopusPublication, ScopusAdmin)
admin.site.register(WOSPublication, WOSAdmin)
admin.site.register(Publication, PublicationAdmin)
