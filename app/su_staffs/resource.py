from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import SU_Staff, Department


class SUStaffResource(resources.ModelResource):
    staff_id = fields.Field(attribute='staff_id', column_name='STAFF ID')
    name = fields.Field(attribute='name', column_name='STAFF NAME')
    title = fields.Field(attribute='title', column_name='Title')
    dpet = fields.Field(attribute='dpet_id', column_name='DPET',
                        widget=ForeignKeyWidget(Department))
    school_id = fields.Field(
        attribute='dpet_id__school_id', column_name='SCHOOL')

    class Meta:
        model = SU_Staff
        fields = ('staff_id', 'name', 'title', 'dpet', 'school_id')
        exclude = ("id")
        skip_unchanged = True
        import_id_fields = ["staff_id",]

    # checks if the dpet_id field is not None, and if it exists, it accesses the school_id field through the relationship and returns its value
    def dehydrate_school_id(self, obj):
        return obj.dpet_id.school_id.school_id if obj.dpet_id else ""
