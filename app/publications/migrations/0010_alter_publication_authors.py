# Generated by Django 4.2.1 on 2023-07-02 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publications', '0009_alter_publication_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publication',
            name='authors',
            field=models.CharField(default='-', verbose_name='Authors'),
        ),
    ]
