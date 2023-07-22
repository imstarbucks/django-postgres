import re
import datetime
from django.contrib.postgres.search import TrigramSimilarity
from import_export import resources, widgets
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget, IntegerWidget, DateWidget
from import_export import fields
from .models import Publisher, Publication, ScopusPublication, WOSPublication
from su_staffs.models import SU_Staff


class ExportStaffIDManyToManyWidget(widgets.ManyToManyWidget):
    def render(self, value, obj=None):
        if value is None:
            return None
        return "; ".join([str(item.staff_id) for item in value.all()])

class ExportStaffNameManyToManyWidget(widgets.ManyToManyWidget):
    def render(self, value, obj=None):
        if value is None:
            return None
        return "; ".join([str(item.name) for item in value.all()])

class ExportSchool(widgets.ForeignKeyWidget):
    def render(self, value, obj=None):
        if value is None:
            return None
        staff = value.first()
        if staff and staff.dpet_id:
            return staff.dpet_id.school_id.school_id
        return None

class CustomManyToManyAuthorsWidget(ManyToManyWidget):
    def clean(self, value, row=None, **kwargs):
        if not value:
            return self.model.objects.none()

        records = value.split(',')
        author_names = []

        for record in records:
            try:
                author_format = record.strip()
                author_names.append(author_format)
            except ValueError:
                # Skip empty records or records with incorrect format
                pass

        # Query the model to retrieve the authors based on the filtered author_names
        authors = self.model.objects.none()
        for name in author_names:
            # Perform fuzzy matching using TrigramSimilarity
            matched_authors = self.model.objects.annotate(similarity=TrigramSimilarity('author_name', name)).filter(similarity__gt=0.7)
            if matched_authors.exists():
                best_match = matched_authors.order_by('-similarity').first()
                authors |= self.model.objects.filter(author_name=best_match.author_name)

        return authors  # Return the first matched instance, or None if no match is found

class CustomManyToManyAffliationWidget(ManyToManyWidget):
    def clean(self, value, row=None, **kwargs):
        if not value:
            return self.model.objects.none()

        records = re.findall(r'\[(.*?)\]', value)[0]
        if not records:
            return self.model.objects.none()

        name_list = [record.upper().strip().replace(',', '') for record in records.split(';')]

        # Query the model to retrieve the staff author name based on the filtered staff author_name
        names = self.model.objects.none()
        for name in name_list:
            # Perform fuzzy matching using TrigramSimilarity
            matched_authors = self.model.objects.annotate(similarity=TrigramSimilarity('name', name)).filter(similarity__gt=0.7)
            if matched_authors.exists():
                best_match = matched_authors.order_by('-similarity').first()
                names |= self.model.objects.filter(name=best_match.name)

        return names

# Auto create Publisher instance if the publisher_name does not exist in the Publisher model
class CustomPublisherWidget(ForeignKeyWidget):
    def clean(self, value, row=None, *args, **kwargs):
        if not value:
            return None

        publisher_name = value

        # Generate publisher_id base on the first letter from each word in publisher_name
        publisher_id = ''.join(word[0].upper()
                               for word in publisher_name.split())

        try:
            publisher = self.model.objects.get(publisher_id=publisher_id)
        except self.model.DoesNotExist:
            # Create a new Publisher object if it doesn't exist
            publisher = self.model.objects.create(
                publisher_id=publisher_id, publisher_name=publisher_name)

        return publisher

# Auto create Scopus instance if the scopus_publication does not exist in the ScopusPublication model
class CustomScopusEIDWidget(ForeignKeyWidget):
    def clean(self, value, row=None, *args, **kwargs):
        if not value:
            return None

        scopus_value = value

        try:
            scopus = self.model.objects.get(eid=scopus_value)
        except self.model.DoesNotExist:
            # Create a new Publisher object if it doesn't exist
            scopus = self.model.objects.create(
                eid = scopus_value.eid)

        return scopus

# Auto create Scopus instance if the scopus_publication does not exist in the ScopusPublication model
class CustomScopusWidget(ForeignKeyWidget):
    def clean(self, value, row, *args, **kwargs):
        if not value:
            return None

        scopus_eid = value
        scopus_link = row.get('Link')
        try:
            scopus = ScopusPublication.objects.get(pk=scopus_eid)
            scopus.link = scopus_link
            scopus.save()

        except ScopusPublication.DoesNotExist:
            # Create a new Publisher object if it doesn't exist
            scopus = ScopusPublication.objects.create(pk=scopus_eid,
                link=scopus_link)

        return scopus

# Auto create WOS instance if the wos_publication does not exist in the WOSPublication model
class CustomWOSWidget(ForeignKeyWidget):
    def clean(self, value, row, *args, **kwargs):
        if not value:
            return None

        wos_id = value
        doi_link = row.get('DOI Link')
        try:
            scopus = WOSPublication.objects.get(pk=wos_id)
            scopus.link = doi_link
            scopus.save()

        except WOSPublication.DoesNotExist:
            # Create a new Publisher object if it doesn't exist
            scopus = WOSPublication.objects.create(pk=wos_id,
                link=doi_link)

        return scopus

class ScopusPublicationResource(resources.ModelResource):
    doi = fields.Field(column_name='DOI', attribute='doi')
    publisher_name = fields.Field(column_name='Publisher', attribute='publisher_name',
                                  widget=CustomPublisherWidget(Publisher, field='publisher_name'))
    doc_types = fields.Field(column_name='Document Type', attribute='doc_types')
    title = fields.Field(column_name='Title', attribute='title')
    source_title = fields.Field(column_name='Source title', attribute='source_title')
    authors = fields.Field(column_name='Authors', attribute='authors')
    volume = fields.Field(column_name='Volume', attribute='volume')
    issue = fields.Field(column_name='Issue', attribute='issue')
    page_start = fields.Field(column_name='Page start', attribute='page_start')
    page_end = fields.Field(column_name='Page end', attribute='page_end')
    published_year = fields.Field(column_name='Year', attribute='published_year', widget=DateWidget())
    issn = fields.Field(column_name='ISSN', attribute='issn')
    isbn = fields.Field(column_name='ISBN', attribute='isbn')
    link = fields.Field(column_name='Link', attribute='link')
    editors = fields.Field(column_name='Editors', attribute='editors')
    su_staff = fields.Field(column_name='Authors', attribute = 'su_staff', widget=CustomManyToManyAuthorsWidget(SU_Staff, field='author_name'))
    scopus_publication = fields.Field(column_name='EID', attribute='scopus_publication', widget=CustomScopusWidget(ScopusPublication, 'eid'))

    def before_save_instance(self, instance, using_transactions, dry_run):
        instance.source_title = instance.source_title.upper() if instance.source_title else None
        return super().before_save_instance(instance, using_transactions, dry_run)

    def before_import_row(self, row, row_number=None, **kwargs):
        # Extract the year value from the row data
        year = row.get('Year')

        # If the year value exists, convert it to a valid date format
        if year:
            year = int(year)
            row['Year'] = datetime.date(year, 1, 1)
        return super().before_import_row(row, row_number, **kwargs)

    def after_save_instance(self, instance, using_transactions, dry_run):
        scopus_pub = instance.scopus_publication
        wos_pub = instance.wos_publication

        if(scopus_pub and wos_pub):
            publication_source = Publication.PublicationSourceChoices.SCOPUSWOS
        else:
            publication_source = Publication.PublicationSourceChoices.SCOPUS

        instance.publication_source = publication_source
        instance.save()

        return super().after_save_instance(instance, using_transactions, dry_run)

    class Meta:
        model = Publication
        fields = ('doi', 'publisher_name', 'doc_types')
        exclude = ("id")
        import_id_fields = ["doi", "title"]

class WOSPublicationResource(resources.ModelResource):
    doi = fields.Field(column_name='DOI', attribute='doi')
    doc_types = fields.Field(column_name='Document Type', attribute='doc_types')
    title = fields.Field(column_name='Article Title', attribute='title')
    source_title = fields.Field(column_name='Source Title', attribute='source_title')
    authors = fields.Field(column_name='Authors', attribute='authors')
    published_year = fields.Field(column_name='Publication Year', attribute='published_year', widget=DateWidget())
    volume = fields.Field(column_name='Volume', attribute='volume')
    issue = fields.Field(column_name='Issue', attribute='issue')
    page_start = fields.Field(column_name='Start Page', attribute='page_start')
    page_end = fields.Field(column_name='End Page', attribute='page_end')
    eissn = fields.Field(column_name='eISSN', attribute='eissn')
    issn = fields.Field(column_name='ISSN', attribute='issn')
    isbn = fields.Field(column_name='ISBN', attribute='isbn')
    editors = fields.Field(column_name='Book Editors', attribute='editors')
    su_staff = fields.Field(column_name='Addresses', attribute = 'su_staff', widget=CustomManyToManyAffliationWidget(SU_Staff, field='author_name'))
    wos_publication = fields.Field(column_name='UT (Unique WOS ID)', attribute='wos_publication', widget=CustomWOSWidget(WOSPublication, 'wos_id'))

    def before_save_instance(self, instance, using_transactions, dry_run):
        instance.source_title = instance.source_title.upper() if instance.source_title else None
        return super().before_save_instance(instance, using_transactions, dry_run)

    def before_import_row(self, row, row_number=None, **kwargs):
        # Extract the year value from the row data
        year = row.get('Publication Year')

        # If the year value exists, convert it to a valid date format
        if year:
            year = int(year)
            row['Publication Year'] = datetime.date(year, 1, 1)
        return super().before_import_row(row, row_number, **kwargs)

    def after_save_instance(self, instance, using_transactions, dry_run):
        scopus_pub = instance.scopus_publication
        wos_pub = instance.wos_publication

        if(scopus_pub and wos_pub):
            publication_source = Publication.PublicationSourceChoices.SCOPUSWOS
        else:
            publication_source = Publication.PublicationSourceChoices.WOS

        instance.publication_source = publication_source
        instance.save()

        return super().after_save_instance(instance, using_transactions, dry_run)

    class Meta:
        model = Publication
        fields = ('doi', 'doc_types', 'title', 'source_title')
        exclude = ("id")
        import_id_fields = ["doi", "title"]

class ExportPublicationResource(resources.ModelResource):
    doi = fields.Field(column_name='DOI', attribute='doi')
    staff_id = fields.Field(column_name="Staff ID", attribute='su_staff', widget=ExportStaffIDManyToManyWidget(SU_Staff, field="staff_id"))
    staff = fields.Field(column_name="Staff", attribute='su_staff', widget=ExportStaffNameManyToManyWidget(SU_Staff, field="name"))
    school = fields.Field(column_name="School",attribute='su_staff', widget=ExportSchool(SU_Staff, field="su_staff"))
    authors = fields.Field(column_name='Authors', attribute='authors')
    industry = fields.Field(column_name="Industry", attribute='industry')
    international = fields.Field(column_name="International", attribute='international')
    national = fields.Field(column_name="Industry", attribute='national')
    title = fields.Field(column_name='Document Title', attribute='title')
    source_title = fields.Field(column_name='Source Title', attribute='source_title')
    editors = fields.Field(column_name='Book Editors', attribute='editors')
    publisher_name = fields.Field(column_name='Publisher', attribute='publisher_name',
                                widget=CustomPublisherWidget(Publisher, field='publisher_name'))
    doc_types = fields.Field(column_name='Document Type', attribute='doc_types')
    publication_source = fields.Field(column_name="Scopus/Wos Classification", attribute="publication_source")
    volume = fields.Field(column_name='Volume', attribute='volume')
    issue = fields.Field(column_name='Issue', attribute='issue')
    page_start = fields.Field(column_name='Start Page', attribute='page_start')
    page_end = fields.Field(column_name='Page end', attribute='page_end')
    published_year = fields.Field(column_name='Publication Year', attribute='published_year', widget=DateWidget())
    issn = fields.Field(column_name='ISSN', attribute='issn')
    eissn = fields.Field(column_name='eISSN', attribute='eissn')
    isbn = fields.Field(column_name='ISBN', attribute='isbn')
    link_to_evidence = fields.Field(column_name="Link to evidence", attribute="scopus_publication__link")
    remarks = fields.Field(column_name="Remarks", attribute="scopus_publication__eid")

    def get_staff_id(self, publication):
        # This method retrieves the list of staff IDs associated with each publication.
        return "; ".join(str(staff.staff_id) for staff in publication.su_staff.all())

    def get_staff_names(self, publication):
        # This method retrieves the list of staff names associated with each publication.
        return "; ".join(staff.name for staff in publication.su_staff.all())
    class Meta:
        model = Publication
        fields = ('doi', 'publisher_name', 'doc_types')
        exclude = ("id")
