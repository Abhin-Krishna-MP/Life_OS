from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    xp = models.IntegerField(default=0)
    level  = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}'s profile"

class Challenge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='challenges', null=True)
    title = models.CharField(max_length=255)
    goal = models.CharField(max_length=255)
    description = models.TextField()
    dailyTasks = models.TextField()
    rules = models.TextField()
    streak = models.JSONField(default=list)

    

    def __str__(self):
        return self.title
    

class JournalEntry(models.Model):
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, related_name='logs')
    text = models.TextField()
    date = models.DateField()

    def __str__(self):
        return f"Log for {self.challenge.title} on {self.date}"
