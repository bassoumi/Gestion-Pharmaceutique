from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

class ProfileInline(admin.StackedInline):
   

    def get_inline_instances(self, request, obj=None):
        if not request.user.is_superuser:
            return []
        if obj and not obj.is_superuser:
            return []
        return super().get_inline_instances(request, obj)

admin.site.unregister(User)
