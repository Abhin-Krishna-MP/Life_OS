from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from .models import Challenge, JournalEntry, UserProfile
from .serializers import ChallengeSerializer, JournalEntrySerializer, UserProfileSerializers


# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    print("DEBUG BODY:", request.data)
    username = request.data.get('username')
    password = request.data.get('password')


    if not username or not password:
            return Response({'error':'Username and Password required'}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({'error':'Username already taken'},status=400)
    
    user = User.objects.create_user(username=username,password=password)
    refresh = RefreshToken.for_user(user)

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    },status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    try:
        profile = UserProfile.objects.get(user=request.user)
        return Response({
            'username': request.user.username,
            'xp': profile.xp,
            'level' : profile.level
        })
    except UserProfile.DoesNotExist:
        return Response({'error':'Profile not found'},status=404)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_streak_day(request, challenge_id):
    try:
        challenge = Challenge.objects.get(id=challenge_id, user=request.user)
    except Challenge.DoesNotExist:
        return Response({'error':'Challenge not found'}, status= status.HTTP_404_NOT_FOUND)
    day = int(request.data.get('day'))
    result = request.data.get('status')

    if result not in ['perfect','missed']:
        return Response({'error':"Invalid status"}, status= status.HTTP_404_NOT_FOUND)
    
    streak = challenge.streak or []

    if len(streak) <= 30:
        streak += [None] * (30-len(streak))
    if streak[day] != result:

        streak[day] = result
        challenge.streak = streak
        challenge.save()

        if result == "perfect":
            profile,_ = UserProfile.objects.get_or_create(user=request.user)
            profile.xp += 10
            if profile.xp >= profile.level*100:
                profile.level = profile.xp//100
            profile.save()
        if result == "missed":
            profile,_ = UserProfile.objects.get_or_create(user=request.user)
            profile.xp -= 10
            if profile.xp <= profile.level*100:
                profile.level = profile.xp//100
            profile.save()
    
    return Response({'message': f'Day {day+1} marked as {result}.'}, status = status.HTTP_200_OK)


class ChallengeViewSet(viewsets.ModelViewSet):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Challenge.objects.filter(user=self.request.user)
    
    def perform_create(self, serializers):
        serializers.save(user=self.request.user)

class JournalViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JournalEntry.objects.filter(challenge__user=self.request.user)
    def perform_create(self, serializers):
        challenge_id = self.request.data.get('challenge')
        serializers.save(challenge_id=challenge_id)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializers
    permission_classes = [IsAuthenticated]
