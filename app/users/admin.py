from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from su_staffs.models import SU_Staff


class SUStaffInline(admin.StackedInline):
    model = SU_Staff
    can_delete=False
    exclude = ('staff_id',)
    verbose_name_plural = "SU Staffs"

class UserAdmin(BaseUserAdmin):
    list_display = ('username','email', 'get_staff_name')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'phone', 'linkedin_link', 'scopus_link', 'profile_image', 'cv')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide', 'extrapretty'),
            'fields': ('username', 'email', 'phone', 'password1', 'password2', 'linkedin_link', 'scopus_link', 'profile_image', 'cv'),
        }),
    )
    # inlines = [SUStaffInline]
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(username=request.user)
    def get_staff_name(self, obj):
        return obj.su_staff.name
    get_staff_name.short_description = 'SU Staff Name'
    get_staff_name.admin_order_field = 'su_staff__name'

admin.site.register(User, UserAdmin)
