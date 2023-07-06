# Generated by Django 4.2.1 on 2023-07-05 13:01

from django.db import migrations, models
import django.db.models.deletion
import publications.models


class Migration(migrations.Migration):

    dependencies = [
        ('su_staffs', '0009_alter_su_staff_name'),
        ('publications', '0015_scopuspublication_su_staff'),
    ]

    operations = [
        migrations.RenameField(
            model_name='scopuspublication',
            old_name='isnn',
            new_name='isbn',
        ),
        migrations.CreateModel(
            name='WOSPublication',
            fields=[
                ('wos_id', models.CharField(max_length=256, primary_key=True, serialize=False, verbose_name='UT (Unique WOS ID)')),
                ('doi', models.CharField(blank=True, max_length=256, null=True, verbose_name='DOI')),
                ('doc_types', models.CharField(choices=[('', ''), ('Article', 'Article'), ('Review', 'Review'), ('Erratum', 'Erratum'), ('Note', 'Note'), ('Conference Paper', 'Conference Paper'), ('Editorial', 'Editorial'), ('Book Chapter', 'Book Chapter'), ('Book', 'Book'), ('Letter', 'Letter'), ('Data Paper', 'Data Paper'), ('Short Survey', 'Short Survey'), ('Proceedings Paper', 'Proceedings Paper'), ('Retraction', 'Retraction'), ('Meeting Abstract', 'Meeting Abstract'), ('Early Access', 'Early Access'), ('Book Review', 'Book Review'), ('Correction', 'Correction'), ('Biographical-Item', 'Biographical-Item'), ('Article; Early Access', 'Article; Early Access'), ('Article; Book Chapter', 'Article; Book Chapter'), ('Article; Data Paper', 'Article; Data Paper'), ('Letter; Early Access', 'Letter; Early Access')], default='', max_length=256, verbose_name='DOCUMENT TYPE')),
                ('title', models.CharField(default='-', verbose_name='Title')),
                ('source_title', models.CharField(default='-', max_length=256, verbose_name='Source Title')),
                ('authors', models.CharField(default='-', verbose_name='Authors')),
                ('published_year', models.IntegerField(default=publications.models.current_year, verbose_name='Published Year')),
                ('volume', models.CharField(blank=True, max_length=256, null=True, verbose_name='Volume')),
                ('issue', models.CharField(blank=True, max_length=256, null=True, verbose_name='Issue')),
                ('page_start', models.CharField(blank=True, max_length=256, null=True, verbose_name='Page Start')),
                ('page_end', models.CharField(blank=True, max_length=256, null=True, verbose_name='Page End')),
                ('editors', models.CharField(blank=True, max_length=256, null=True, verbose_name='Editors')),
                ('eissn', models.CharField(blank=True, max_length=256, null=True, verbose_name='eISSN')),
                ('issn', models.CharField(blank=True, max_length=256, null=True, verbose_name='ISSN')),
                ('isbn', models.CharField(blank=True, max_length=256, null=True, verbose_name='ISBN')),
                ('link', models.URLField(default='-', verbose_name='Link')),
                ('source', models.CharField(default='WOS', max_length=10, verbose_name='Source')),
                ('publisher_name', models.ForeignKey(blank=True, db_column='publisher_name', null=True, on_delete=django.db.models.deletion.CASCADE, to='publications.publisher')),
                ('su_staff', models.ManyToManyField(blank=True, default=None, null=True, related_name='wos_su_staff', to='su_staffs.su_staff')),
            ],
            options={
                'verbose_name': 'WOS Publication',
                'verbose_name_plural': 'WOS Publications',
            },
        ),
    ]
