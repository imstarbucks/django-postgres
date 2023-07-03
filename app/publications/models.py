from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import date
from su_staffs.models import SU_Staff

class Publisher(models.Model):
    publisher_id = models.CharField(
        'PUBLISHER ID', max_length=256, primary_key=True)
    publisher_name = models.CharField('PUBLISHER NAME', max_length=256)

    def __str__(self):
        return self.publisher_name

def current_year():
    return date.today().year

class ScopusPublication(models.Model):

    class Meta:
        verbose_name = "Scopus Publication"
        verbose_name_plural = "Scopus Publications"

    class DocTypeChoices(models.TextChoices):
        BLANK = "", _("")
        ARTICLE = "Article", _("Article")
        REVIEW = "Review", _("Review")
        ERRATUM = "Erratum", _("Erratum")
        NOTE = "Note", _("Note")
        CONFERENCE_PAPER = "Conference Paper", _("Conference Paper")
        EDITORIAL = "Editorial", _("Editorial")
        BOOK_CHAPTER = "Book Chapter", _("Book Chapter")
        BOOK = "Book", _("Book")
        LETTER = "Letter", _("Letter")
        DATA_PAPER = "Data Paper", _("Data Paper")
        SHORT_SURVEY = "Short Survey", _("Short Survey")
        PROCEEDINGS_PAPER = "Proceedings Paper", _("Proceedings Paper")
        RETRACTION = "Retraction", _("Retraction")
        MEETING_ABSTRACT = "Meeting Abstract", _("Meeting Abstract")
        EARLY_ACCESS = "Early Access", _("Early Access")
        BOOK_REVIEW = "Book Review", _("Book Review")
        CORRECTION = "Correction", _("Correction")
        BIOGRAPHICAL_ITEM = "Biographical-Item", _("Biographical-Item")
        ARTICLE_EARLY_ACCESS = "Article; Early Access", _("Article; Early Access")
        ARTICLE_BOOK_CHAPTER = "Article; Book Chapter", _("Article; Book Chapter")
        ARTICLE_DATA_PAPER = "Article; Data Paper", _("Article; Data Paper")
        LETTER_EARLY_ACCESS = "Letter; Early Access", _("Letter; Early Access")

    eid = models.CharField('EID', max_length=256,
                           primary_key=True)
    doi = models.CharField('DOI', max_length=256, null=True, blank=True)
    publisher_name = models.ForeignKey(
        Publisher, on_delete=models.CASCADE, null=True, blank=True, db_column='publisher_name')
    doc_types = models.CharField('DOCUMENT TYPE', max_length=256, default=DocTypeChoices.BLANK, choices=DocTypeChoices.choices)
    title = models.CharField('Title', default="-")
    source_title = models.CharField('Source Title', max_length=256, default="-")
    authors = models.CharField('Authors', default="-")
    published_year = models.IntegerField("Published Year", default=current_year)
    volume = models.CharField('Volume', max_length=256, null=True, blank=True)
    issue = models.CharField('Issue', max_length=256, null=True, blank=True)
    page_start = models.CharField('Page Start', max_length=256, null=True, blank=True)
    page_end = models.CharField('Page End', max_length=256, null=True, blank=True)
    link = models.URLField('Link', default="-")
    editors = models.CharField('Editors', max_length=256, null=True, blank=True)
    issn = models.CharField('ISSN', max_length=256, null=True, blank=True)
    isnn = models.CharField('ISBN', max_length=256, null=True, blank=True)
    source = models.CharField('Source', max_length=10, default="Scopus")
    su_staff = models.ManyToManyField(SU_Staff, related_name='scopus_su_staff', default=None, blank=True, null=True)












