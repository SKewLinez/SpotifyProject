from .models import Party
from django.shortcuts import render
from rest_framework import generics
from .serialisers import PartySerialiser

# Create your views here. - endpoints
class PartyView(generics.ListAPIView):
    queryset = Party.objects.all()
    serializer_class = PartySerialiser
