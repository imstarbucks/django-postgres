from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from su_staffs.models import SU_Staff
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ["user"]


class SUStaffInline(admin.StackedInline):
    model = SU_Staff
    can_delete = False
    # exclude = ("staff_id",)
    verbose_name_plural = "SU Staffs"


class UserAdmin(BaseUserAdmin):
    list_display = ("username", "email", "get_staff_name")
    search_fields = ("username", "su_staff__name")
    readonly_fields = [
        "date_joined",
        "last_login",
    ]
    inlines = [SUStaffInline]

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "email",
                    "phone",
                    "biography",
                    "linkedin_link",
                    "scopus_link",
                    "profile_image",
                    "cv",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide"),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                ),
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        is_superuser = request.user.is_superuser
        disabled_fields = set()

        if not is_superuser:
            disabled_fields |= {
                "username",
                "is_superuser",
                "is_active",
                "is_staff",
                "user_permissions",
                "groups",
            }

            # Prevent non-superusers from editing their own permissions
        if not is_superuser and obj is not None and obj == request.user:
            disabled_fields |= {
                "username",
                "is_superuser",
                "is_active",
                "is_staff",
                "user_permissions",
                "groups",
            }

        for f in disabled_fields:
            if f in form.base_fields:
                form.base_fields[f].disabled = True

        return form

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(username=request.user)

    def get_staff_name(self, obj):
        return obj.su_staff.name

    get_staff_name.short_description = "SU Staff Name"
    get_staff_name.admin_order_field = "su_staff__name"


class TokenAdmin(admin.ModelAdmin):
    list_display = ["key", "user"]


admin.site.register(User, UserAdmin)
# admin.site.register(Token, TokenAdmin)
