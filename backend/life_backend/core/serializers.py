from rest_framework import serializers
from .models import Challenge, JournalEntry, UserProfile


class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = '__all__'

class ChallengeSerializer(serializers.ModelSerializer):
    logs = JournalEntrySerializer(many=True, read_only=True)
    class Meta:
        model = Challenge
        fields ='__all__'
        read_only_fields = ['logs','user']

class UserProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'