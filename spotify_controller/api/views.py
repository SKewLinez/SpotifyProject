from django.db.models.query import QuerySet
from django.db.models.query_utils import subclasses
from rest_framework.serializers import Serializer
from .models import Party
from django.shortcuts import render
from rest_framework import generics, status
from .serialisers import CreatePartySerialiser, PartySerialiser
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here. - endpoints
class PartyView(generics.ListAPIView):
    queryset = Party.objects.all()
    serializer_class = PartySerialiser

   # def delete(self, request, *args, **kwargs):
        
        # queryset.delete()
        # return Response("Question deleted", status=status.HTTP_204_NO_CONTENT)
    # Party.objects.filter(id=0).delete()

class CreatePartyView(APIView):
    serializer_class = CreatePartySerialiser
    http_method_names = ['post']

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serialiser = self.serializer_class(data=request.data)
        if serialiser.is_valid():
            guest_can_pause = serialiser.data.get('guest_can_pause')
            votes_to_skip = serialiser.data.get('votes_to_skip')
            host = self.request.session.session_key       
            queryset = Party.objects.filter(host=host)         
            if queryset.exists():
                party = queryset[0]
                party.guest_can_pause = guest_can_pause
                party.save(update_fields = ['guest_can_pause', 'votes_to_skip'])
                return Response(PartySerialiser(party).data, status=status.HTTP_200_OK)
            else:
                party = Party(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                party.save()
                return Response(PartySerialiser(party).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)