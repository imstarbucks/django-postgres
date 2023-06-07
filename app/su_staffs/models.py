from django.db import models
from django.utils.translation import gettext_lazy as _
# Create your models here.


class SU_Staff(models.Model):

    # Select dropdown for Title/Salutation
    class Salutation(models.TextChoices):
        BLANK = "", _("")
        PROF = "Prof.", _("Prof.")
        ASSOC_PROF = "Assoc. Prof.", _("Assoc. Prof.")
        ASSOC_PROF_DR = "Assoc. Prof. Dr", _("Assoc. Prof. Dr")
        DR = "Dr", _("Dr")
        MR = "Mr", _("Mr")
        MS = "Ms", _("Ms")

    staff_id = models.CharField(("STAFF ID"), max_length=20, primary_key=True)
    name = models.CharField(("STAFF NAME"), max_length=256)
    title = models.CharField(("Title"),
                             max_length=20, choices=Salutation.choices, default=Salutation.BLANK)
    status = models.BooleanField(
        "Status", default=True)

    class Meta:
        verbose_name = "SU Staff"
        verbose_name_plural = "SU Staffs"

    def __str__(self):
        return (self.name)


class School(models.Model):
    school = models.CharField(("School"), max_length=256)
    dept_id = models.CharField(("Dept"), max_length=20, primary_key=True)

    def __str__(self):
        return self.school
