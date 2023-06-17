from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import SU_Staff


class SUStaffResource(resources.ModelResource):
    staff_id = fields.Field(attribute='staff_id', column_name='STAFF ID')
    name = fields.Field(attribute='name', column_name='STAFF NAME')
    title = fields.Field(attribute='title', column_name='Title')

    class Meta:
        model = SU_Staff
        fields = ('staff_id', 'name', 'title', 'dept', 'school')
        exclude = ("id")
        skip_unchanged = True
        import_id_fields = ["staff_id",]
