from django.contrib import admin
from user.models import Account
from django.contrib.auth.admin import UserAdmin

class AccountAdmin(UserAdmin):
  list_display = ('email', 'name', 'date_joined', 'last_login', 'is_admin', 'is_staff')
  search_fields = ('email', 'name')
  readonly_fields = ('date_joined', 'last_login')
  
  filter_horizontal = ()
  fieldsets = ()
  list_filter = ()
  ordering = (['email'])

admin.site.register(Account, AccountAdmin)