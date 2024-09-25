# Generated by Django 5.0.6 on 2024-08-31 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_actiondemande_demande_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='ADRESSE',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='patient',
            name='DATE_NAISSANCE',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='EMAIL',
            field=models.EmailField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='patient',
            name='SEXE',
            field=models.CharField(choices=[('M', 'Masculin'), ('F', 'Féminin')], default='M', max_length=1),
        ),
        migrations.AddField(
            model_name='patient',
            name='TELEPHONE',
            field=models.CharField(default='', max_length=15),
        ),
        migrations.AddField(
            model_name='patient',
            name='num_carte_desoin',
            field=models.CharField(default='', max_length=50),
        ),
    ]