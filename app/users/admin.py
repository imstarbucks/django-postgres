from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from su_staffs.models import SU_Staff

class SUStaffInline(admin.StackedInline):
    model = SU_Staff
    can_delete=False
    verbose_name_plural = "SU Staffs"

class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'phone')  # Add 'phone' and 'staff_id' to the list display
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone')}),  # Include 'phone' and 'staff_id' in the 'Personal info' fieldset
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    # Add 'phone' and 'staff_id' to the user change form
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'phone', 'password1', 'password2'),
        }),
    )
    inlines = [SUStaffInline]

admin.site.register(User, UserAdmin)
