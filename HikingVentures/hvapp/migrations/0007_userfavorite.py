# Generated by Django 3.2.5 on 2022-10-11 14:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hvapp', '0006_auto_20221010_1320'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFavorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorites', to='hvapp.trail')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_trails', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'trail')},
            },
        ),
    ]