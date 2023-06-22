from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import Grant, Sponsor
from su_staffs.models import SU_Staff
from django.core.exceptions import ObjectDoesNotExist


class GrantResource(resources.ModelResource):
    sponsor = fields.Field(
        column_name='SPONSOR (MOHE/MOSTI ETC.)',
        attribute='sponsor',
        widget=ForeignKeyWidget(Sponsor, 'sponsor_id')
    )

    sponsor_category = fields.Field(
        column_name='SPONSOR CATEGORY (UNIVERSITY, NATIONAL, PRIVATE, INTERNATIONAL)',
        attribute='get_sponsor_category'
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
        column_name='SU STAFF', attribute='su_staff', widget=ForeignKeyWidget(SU_Staff, 'name')
    )
    # su_staff = fields.Field(
    #     column_name='SU STAFF', attribute='name'
    # )

    project_start_date = fields.Field(
        column_name='Project Start Date', attribute='project_start_date'
    )

    project_end_date = fields.Field(
        column_name='Project End Date', attribute='project_end_date'
    )

    amount_awarded = fields.Field(
        column_name='AMOUNT AWARDED (RM)', attribute='amount_awarded'
    )

    def get_sponsor_category(self, instance):
        return instance.sponsor.sponsor_category

    def before_save_instance(self, instance, using_transactions, dry_run):
        # Retrieve the staff_name value from the instance
        staff_name = instance.name

        try:
            # Attempt to find the matching SU_Staff object
            su_staff = SU_Staff.objects.get(name=staff_name)

        # Convert staff_name to capital format
            upper_staff_name = self.convert_to_all_capital(staff_name)

        # Assign the upper_staff_name to the name field of the SU_Staff instance
            su_staff.name = upper_staff_name

        # Save the modified SU_Staff instance
            su_staff.save()

        except ObjectDoesNotExist:
            # Handle the case when no matching SU_Staff object is found
            print(f"No SU_Staff object found with name: {staff_name}")

    @staticmethod
    def convert_to_all_capital(staff_name):
        try:
            upper_name = staff_name.upper()
            return upper_name
        except Exception as e:
            return (f"Conversion Error: {str(e)}")

    class Meta:
        model = Grant
        fields = ('project_code', 'project_title',
                  'grant_name', 'sponsor', 'sponsor_category', 'su_staff')
        exclude = ('id', 'NO.')
        skip_unchanged = True
        import_id_fields = ["project_code",]
