from django.db import models
from django.utils.translation import gettext_lazy as _
from su_staffs.models import SU_Staff


class Sponsor(models.Model):
    class Category(models.TextChoices):
        INTERNATIONAL = "International", _("International")
        NATIONAL = "National", _("National")
        COLLABORATION = "Collaboration", _("Collaboration")
        PRIVATE = "Private", _("Private")

    sponsor_id = models.CharField(
        _("SPONSOR ID"), max_length=20, primary_key=True)
    sponsor_name = models.CharField(
        _("SPONSOR NAME"), max_length=256,)
    sponsor_category = models.CharField(
        "SPONSOR CATEGORY", max_length=20, choices=Category.choices, default=Category.NATIONAL)

    class Meta:
        verbose_name = _("Sponsor")
        verbose_name_plural = _("Sponsors")

    def __str__(self):
        return self.sponsor_name


class Grant(models.Model):
    project_code = models.CharField(
        "PROJECT CODE", max_length=256, primary_key=True)
    project_title = models.CharField("PROJECT TITLE", max_length=256)
    grant_name = models.CharField(
        "GRANT NAME", max_length=256, null=True, blank=True)
    sponsor = models.ForeignKey(
        Sponsor, on_delete=models.CASCADE, db_column='sponsor_name', null=True, blank=True)
    su_staff = models.ForeignKey(SU_Staff, on_delete=models.CASCADE,
                                 db_column='staff_id', null=True, blank=True)
    project_start_date = models.DateField(
        "PROJECT START DATE", max_length=256, blank=True, null=True)
    project_end_date = models.DateField(
        "PROJECT END DATE", max_length=256, blank=True, null=True)
    collaborators = models.ManyToManyField(
        SU_Staff, blank=True, null=True, related_name="grant_su_staff")
    amount_awarded = models.DecimalField(
        "AMOUNT AWARDED (RM)", max_digits=10, decimal_places=2, null=True, blank=True)
