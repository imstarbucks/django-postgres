from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.db import migrations, models

def populate_user(apps, schema_editor):
    User = get_user_model()
    SU_Staff = apps.get_model('su_staffs', 'SU_Staff')

    # Retrieve all SU_Staff objects
    su_staffs = SU_Staff.objects.all()

    for su_staff in su_staffs:
        # Generate the username and password
        username = su_staff.staff_id
        password = 'init' + su_staff.staff_id

        # Create a new User object
        user = User(
            username=username,
            password=make_password(password),
        )

        # Save the User object
        user.save()

class Migration(migrations.Migration):

    dependencies = [
        ('su_staffs', '0011_alter_su_staff_user'),
    ]

    operations = [
        migrations.RunPython(populate_user),
    ]
