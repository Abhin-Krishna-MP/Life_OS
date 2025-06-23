from django.contrib import admin
from django.contrib.auth.models import User
from .models import UserProfile

# Show profile inline with user
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'

class CustomUserAdmin(admin.ModelAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'is_staff')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'xp', 'level']


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
