from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Models
class AccountManager(BaseUserManager):
  def create_user(self, email, name, password=None):
    if not email:
      raise ValueError('Email address is required')
    if not name:
      raise ValueError('Full name is required')

    user = self.model(
      email = self.normalize_email(email),
      name = name
    )

    user.set_password(password)
    user.save(using=self._db)

    return user

  def create_superuser(self, email, name, password):
    user = self.create_user(
      email = self.normalize_email(email),
      name = name,
      password = password
    )
    user.is_admin = True
    user.is_staff = True
    user.is_superuser = True
    user.save(using=self._db)
    
    return user

class Account(AbstractBaseUser):
  email = models.EmailField(max_length=200, unique=True, verbose_name='email')
  name = models.CharField(max_length=200)
  date_joined = models.DateTimeField(auto_now_add=True, verbose_name='date joined')
  last_login = models.DateTimeField(auto_now=True, verbose_name='last login')
  is_admin = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name',]

  objects = AccountManager()

  def __str__(self):
    return self.email

  def has_perm(self, perm, obj=None):
    return self.is_admin

  def has_module_perms(self, app_label):
    return True