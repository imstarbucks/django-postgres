from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone = models.CharField(max_length=32, blank=True, null=True)
    # staff_id = models.OneToOneField('su_staffs.staff_id', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'auth_user'

    def __str__(self):
            return self.username
