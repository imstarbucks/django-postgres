from django.db import models
from django.utils.translation import gettext_lazy as _


class School(models.Model):
    school_id = models.CharField(
        ("SCHOOL ID"), max_length=20, primary_key=True)
    school_name = models.CharField(
        ("SCHOOL NAME"), max_length=255)

    def __str__(self):
        return self.school_id


class Department(models.Model):
    dept_id = models.CharField(
        ("DEPARTMENT ID"), max_length=20, primary_key=True)
    dept_name = models.CharField(
        ("DEPARTMENT NAME"), max_length=255)
    school_id = models.ForeignKey(
        School, on_delete=models.CASCADE, db_column='school_id', default=None)

    def __str__(self):
        return self.dept_id


class SU_Staff(models.Model):

    # Select dropdown for Title/Salutation
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

    staff_id = models.CharField(("STAFF ID"), max_length=20, primary_key=True)
    name = models.CharField(("STAFF NAME"), max_length=256)
    title = models.CharField(("TITLE"),
                             max_length=20, choices=Salutation.choices, default=Salutation.BLANK)
    status = models.BooleanField(
        "STATUS", default=True)
    dept_id = models.ForeignKey(
        Department, on_delete=models.CASCADE, db_column='dept_id', default=None, null=True)
    school_id = models.ForeignKey(
        School, on_delete=models.CASCADE, db_column='school_id', default=None)

    class Meta:
        verbose_name = "SU Staff"
        verbose_name_plural = "SU Staffs"

    def __str__(self):
        return (self.name)
