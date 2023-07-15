from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone = models.CharField(max_length=32, blank=True, null=True)
    biography = models.TextField(blank=True, null=True, default=None)
    scopus_link = models.URLField(blank=True, null=True, default=None)
    linkedin_link = models.URLField(blank=True, null=True, default=None)
    profile_image = models.ImageField(
        upload_to="profile_image", null=True, blank=True, default=None
    )
    cv = models.FileField(upload_to="cv", null=True, blank=True, default=None)

    class Meta:
        db_table = "auth_user"

    def __str__(self):
        return f"{self.username}"
