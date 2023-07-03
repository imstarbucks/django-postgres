from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget
from .models import Grant, Sponsor
from su_staffs.models import SU_Staff
from django.core.exceptions import ObjectDoesNotExist


class CustomManyToManyWidget(ManyToManyWidget):
    def clean(self, value, row=None, *args, **kwargs):
        if not value:
            return self.model.objects.none()

        # Split the value by semicolon (;) to separate individual records
        records = value.split(";")

        staff_names = []

        for record in records:
            try:
                # Split the record by comma (,) to separate name, institution, and country
                name, institution, country = [
                    x.strip() for x in record.split(",")]

                # Check if the institution is "Sunway University"
                if institution.lower() == "sunway university":
                    # Append the staff name to the list
                    staff_names.append(name.upper())
            except ValueError:
                # Skip empty records or records with incorrect format
                pass

        # Query the model to retrieve the Sunway University staff based on the filtered staff names
        sunway_staff = self.model.objects.filter(name__in=staff_names)

        return sunway_staff


class CapitalizedForeignKeyWidget(ForeignKeyWidget):
    default_value = None  # Set your desired default value here

    def clean(self, value, row=None, *args, **kwargs):
        # Convert the value to capital letters
        value = value.upper()

        # Query the SU_Staff table based on the name column (case-insensitive)
        try:
            staff = SU_Staff.objects.filter(name__iexact=value).first()
            return staff
        except SU_Staff.DoesNotExist:
            return self.default_value


class GrantResource(resources.ModelResource):
    sponsor = fields.Field(
        column_name='SPONSOR (MOHE/MOSTI ETC.)',
        attribute='sponsor',
        widget=ForeignKeyWidget(Sponsor, 'sponsor_id')
    )

    sponsor_category = fields.Field(
        column_name='SPONSOR CATEGORY (UNIVERSITY, NATIONAL, PRIVATE, INTERNATIONAL)',
        attribute='sponsor__sponsor_category'
    )

    grant_name = fields.Field(
        column_name='GRANT NAME (SCIENCEFUND/FRGS ETC.)', attribute='grant_name'
    )

    project_code = fields.Field(
        column_name='PROJECT CODE', attribute='project_code'
    )

    project_title = fields.Field(
        column_name='PROJECT TITLE', attribute='project_title'
    )

    su_staff = fields.Field(
        column_name='SU STAFF', attribute='su_staff', widget=CapitalizedForeignKeyWidget(SU_Staff, 'name')
    )
    # su_staff = fields.Field(
    #     column_name='SU STAFF', attribute='name'
    # )

    school_id = fields.Field(
        column_name='SCHOOL NAME', attribute='su_staff__dpet_id__school_id')

    project_start_date = fields.Field(
        column_name='Project Start Date', attribute='project_start_date'
    )

    project_end_date = fields.Field(
        column_name='Project End Date', attribute='project_end_date'
    )

    amount_awarded = fields.Field(
        column_name='AMOUNT AWARDED (RM)', attribute='amount_awarded'
    )

    collaborators = fields.Field(
        column_name='COLLABORATORS',
        attribute='collaborators',
        widget=CustomManyToManyWidget(SU_Staff, field='name')
    )

    def get_sponsor_category(self, instance):
        return instance.sponsor.sponsor_category

    class Meta:
        model = Grant
        fields = ('project_code', 'project_title',
                  'grant_name', 'sponsor', 'sponsor_category', 'su_staff')
        exclude = ('id', 'NO.')
        skip_unchanged = True
        import_id_fields = ["project_code",]
