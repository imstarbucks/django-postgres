# Generated by Django 4.2.1 on 2023-06-03 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('su_staffs', '0005_su_staff_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='su_staff',
            name='status',
            field=models.IntegerField(choices=[(1, 'Active'), (0, 'InActive')], default=1, verbose_name='Status'),
        ),
    ]
