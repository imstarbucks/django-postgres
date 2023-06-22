from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import SU_Staff, Department, School
from nameparser import HumanName


class SUStaffResource(resources.ModelResource):
    staff_id = fields.Field(attribute='staff_id', column_name='STAFF ID')
    name = fields.Field(attribute='name', column_name='STAFF NAME')
    title = fields.Field(attribute='title', column_name='Title')
    dpet = fields.Field(attribute='dpet_id', column_name='DPET',
                        widget=ForeignKeyWidget(Department))
    # school_id = fields.Field(
    #     attribute='dpet_id__school_id', column_name='SCHOOL')
    # author_name = fields.Field(
    #     attribute='author_name', column_name='Author Name', readonly=True)

    class Meta:
        model = SU_Staff
        fields = ('staff_id', 'name', 'title',
                  'dpet', 'author_name')
        exclude = ("id", 'school_id')
        skip_unchanged = True
        import_id_fields = ["staff_id",]

    def before_save_instance(self, instance, using_transactions, dry_run):
        # Retrieve the staff_name value from the instance
        staff_name = instance.name

        # Convert staff_name to author_name format
        author_name = self.convert_to_author_name(staff_name)

        # Assign the author_name to the author_name field of the SU_Staff instance
        instance.author_name = author_name

        # Save the modified instance
        instance.save()

    @staticmethod
    def convert_to_author_name(staff_name):
        try:
            name = HumanName(staff_name)
            name.capitalize()
            last_name = name.last
            first_name = f"{name.first}" if name.first else ""
            middle_initial = f"{name.middle}" if name.middle else ""

            # Handle cases with only two words in the staff name
            if not first_name and last_name:
                return last_name
            elif not last_name and first_name:
                return f"{first_name[0]}."
            elif not middle_initial:
                return f"{last_name} {first_name[0]}."

            if (middle_initial == "A/L" or middle_initial == "A/P"):
                return f"{last_name} {first_name[0]}."

            return f"{last_name} {first_name[0]}.{middle_initial[0]}."

        except Exception as e:
            return (f"Conversion Error: {str(e)}")
