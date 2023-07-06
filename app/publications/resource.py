import re
from import_export import resources, widgets
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget, IntegerWidget
from import_export import fields
from .models import ScopusPublication, WOSPublication, Publisher
from su_staffs.models import SU_Staff

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

        # Query the model to retrieve the staff author name based on the filtered staff author_name
		staff = self.model.objects.filter(author_name__in = author_names)
		staff_ids = staff.values_list('staff_id', flat=True)

		return staff_ids

class CustomManyToManyAffliationWidget(ManyToManyWidget):
    def clean(self, value, row=None, **kwargs):
        if not value:
            return self.model.objects.none()

        records = re.findall(r'\[(.*?)\]', value)[0]
        if not records:
            return self.model.objects.none()

        name_list = [record.upper().strip().replace(',', '') for record in records.split(';')]

        staff = self.model.objects.filter(name__in=name_list)
        staff_ids = staff.values_list('staff_id', flat=True)

        return staff_ids

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

class WOSPublicationResource(resources.ModelResource):
    wos_id = fields.Field(column_name='UT (Unique WOS ID)', attribute='wos_id')
    doi = fields.Field(column_name='DOI', attribute='doi')
    publisher_name = fields.Field(column_name='Publisher', attribute='publisher_name',
                                  widget=CustomPublisherWidget(Publisher, field='publisher_name'))
    doc_types = fields.Field(column_name='Document Type', attribute='doc_types')
    title = fields.Field(column_name='Article Title', attribute='title')
    source_title = fields.Field(column_name='Source Title', attribute='source_title')
    authors = fields.Field(column_name='Authors', attribute='authors')
    published_year = fields.Field(column_name='Publication Year', attribute='published_year', widget=IntegerWidget(True))
    volume = fields.Field(column_name='Volume', attribute='volume')
    issue = fields.Field(column_name='Issue', attribute='issue')
    page_start = fields.Field(column_name='Start Page', attribute='page_start')
    page_end = fields.Field(column_name='End Page', attribute='page_end')
    eissn = fields.Field(column_name='eISSN', attribute='eissn')
    issn = fields.Field(column_name='ISSN', attribute='issn')
    isbn = fields.Field(column_name='ISBN', attribute='isbn')
    link = fields.Field(column_name='DOI Link', attribute='link')
    editors = fields.Field(column_name='Book Editors', attribute='editors')
    su_staff = fields.Field(column_name='Addresses', attribute = 'su_staff', widget=CustomManyToManyAffliationWidget(SU_Staff, field='author_name'))


    class Meta:
        model = WOSPublication
        fields = ('wos_id', 'doi', 'publisher_name', 'doc_types')
        exclude = ("id")
        import_id_fields = ["wos_id",]


class ScopusPublicationResource(resources.ModelResource):
    eid = fields.Field(column_name='EID', attribute='eid')
    doi = fields.Field(column_name='DOI', attribute='doi')
    publisher_name = fields.Field(column_name='Publisher', attribute='publisher_name',
                                  widget=CustomPublisherWidget(Publisher, field='publisher_name'))
    doc_types = fields.Field(column_name='Document Type', attribute='doc_types')
    title = fields.Field(column_name='Title', attribute='title')
    source_title = fields.Field(column_name='Source title', attribute='source_title')
    authors = fields.Field(column_name='Authors', attribute='authors')
    published_year = fields.Field(column_name='Year', attribute='published_year')
    volume = fields.Field(column_name='Volume', attribute='volume')
    issue = fields.Field(column_name='Issue', attribute='issue')
    page_start = fields.Field(column_name='Page start', attribute='page_start')
    page_end = fields.Field(column_name='Page end', attribute='page_end')
    issn = fields.Field(column_name='ISSN', attribute='issn')
    isbn = fields.Field(column_name='ISBN', attribute='isbn')
    link = fields.Field(column_name='Link', attribute='link')
    editors = fields.Field(column_name='Editors', attribute='editors')
    su_staff = fields.Field(column_name='Authors', attribute = 'su_staff', widget=CustomManyToManyAuthorsWidget(SU_Staff, field='author_name'))

    def before_save_instance(self, instance, using_transactions, dry_run):
        eid = instance.eid

        prefix_eid = self.prefix_eid(eid)

        instance.eid = prefix_eid
        instance.save()

    @staticmethod
    def prefix_eid(eid):
        try:
            prefix = "SCOPUS:"
            return f"{prefix}{eid}"
        except Exception as e:
            return (f"Conversion Error: {str(e)}")


    class Meta:
        model = ScopusPublication
        fields = ('eid', 'doi', 'publisher_name', 'doc_types')
        exclude = ("id")
        import_id_fields = ["eid",]
