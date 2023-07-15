from django.db import models
from django.utils.translation import gettext_lazy as _

# from users.models import User
from django.contrib.auth import get_user_model


class School(models.Model):
    school_id = models.CharField(_("SCHOOL ID"), max_length=20, primary_key=True)
    school_name = models.CharField(_("SCHOOL NAME"), max_length=255)

    def __str__(self):
        return self.school_id


def get_default_school():
    return School.objects.get_or_create(school_id="NO_SCHOOL")[0]


class Department(models.Model):
    dpet_id = models.CharField(_("DEPARTMENT ID"), max_length=20, primary_key=True)
    dpet_name = models.CharField(_("DEPARTMENT NAME"), max_length=255)
    school_id = models.ForeignKey(
        "School",
        on_delete=models.CASCADE,
        db_column="school_id",
        default=get_default_school,
    )

    def __str__(self):
        return self.dpet_id


def get_default_dept():
    return Department.objects.get_or_create(dpet_id="NO_DEPT")[0]


class SU_Staff(models.Model):
    # Select dropdown for Title/Salutation
    CustomUser = get_user_model()

    class Salutation(models.TextChoices):
        BLANK = "", _("")
        PROF = "Prof.", _("Prof.")
        ASSOC_PROF = "Assoc. Prof.", _("Assoc. Prof.")
        ASSOC_PROF_DR = "Assoc. Prof. Dr", _("Assoc. Prof. Dr")
        PROF_DATUK_DR = "Prof. Datuk Dr", _("Prof. Datuk Dr")
        PROF_DATIN_DR = "Prof. Datin Dr", _("Prof. Datin Dr")
        DR = "Dr", _("Dr")
        MR = "Mr", _("Mr")
        MS = "Ms", _("Ms")

    staff_id = models.CharField(_("STAFF ID"), max_length=20, primary_key=True)
    name = models.CharField(_("STAFF NAME"), max_length=256)
    title = models.CharField(
        _("TITLE"), max_length=20, choices=Salutation.choices, default=Salutation.BLANK
    )
    status = models.BooleanField(_("STATUS"), default=True)
    dpet_id = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        default=get_default_dept,
        db_column="dpet_id",
    )
    author_name = models.CharField(
        "AUTHOR NAME", max_length=256, default=None, blank=True, null=True
    )
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        db_column="username",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "SU Staff"
        verbose_name_plural = "SU Staffs"

    def __str__(self):
        return f"{self.staff_id}: {self.name}"
