from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChallengeViewSet, JournalViewSet, UserProfileViewSet, mark_streak_day, get_user_profile,run_migrations,create_super_user

router = DefaultRouter()

router.register(r'challenges', ChallengeViewSet)
router.register(r'logs', JournalViewSet)
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('profile/', get_user_profile),
    path('challenges/<int:challenge_id>/mark-day/', mark_streak_day),
]