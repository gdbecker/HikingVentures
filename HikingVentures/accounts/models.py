from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# from hvapp.models import State

class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, city, state, img_url, password=None):
        if not email:
            raise ValueError('Users must have an email address.')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            city=city,
            state=state,
            img_url=img_url
        )
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, first_name, last_name, city, state, img_url, password=None):
        if not email:
            raise ValueError('Users must have an email address.')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            city=city,
            state=state,
            img_url=img_url,
            is_superuser=True
        )
        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.ForeignKey('hvapp.State', related_name='users', on_delete=models.CASCADE)
    img_url = models.CharField(max_length=300)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'city', 'state', 'img_url']

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def __str__(self):
        return self.email
