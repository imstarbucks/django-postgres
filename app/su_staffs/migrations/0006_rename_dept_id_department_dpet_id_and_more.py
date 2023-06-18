# Generated by Django 4.2.1 on 2023-06-17 16:22

from django.db import migrations, models
import django.db.models.deletion
import su_staffs.models


class Migration(migrations.Migration):

    dependencies = [
        ('su_staffs', '0005_remove_su_staff_school_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='department',
            old_name='dept_id',
            new_name='dpet_id',
        ),
        migrations.RenameField(
            model_name='department',
            old_name='dept_name',
            new_name='dpet_name',
        ),
        migrations.RemoveField(
            model_name='su_staff',
            name='dept_id',
        ),
        migrations.AddField(
            model_name='su_staff',
            name='dpet_id',
            field=models.ForeignKey(db_column='dpet_id', default=su_staffs.models.get_default_dept, on_delete=django.db.models.deletion.CASCADE, to='su_staffs.department'),
        ),
    ]
