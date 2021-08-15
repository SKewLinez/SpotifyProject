from django.db.models.query import QuerySet
from django.db.models.query_utils import subclasses
from django.http.response import JsonResponse
from rest_framework import serializers
from rest_framework.serializers import Serializer
from .models import Party
from django.shortcuts import render
from rest_framework import generics, status
from .serialisers import CreatePartySerialiser, PartySerialiser, UpdatePartySerialiser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here. - endpoints


class PartyView(generics.ListAPIView):
    queryset = Party.objects.all()
    serializer_class = PartySerialiser


class GetParty(APIView):
    serializer_class = PartySerialiser
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            party = Party.objects.filter(code=code)
            if len(party) > 0:
                data = PartySerialiser(party[0]).data
                data['is_host'] = self.request.session.session_key == party[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Party Not Found': 'Invalid Party Code.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameters not found in request.'}, status=status.HTTP_400_BAD_REQUEST)


class JoinParty(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)

        if code != None:
            party_result = Party.objects.filter(code=code)
            if len(party_result) > 0:
                party = party_result[0]
                # self.request.session['party_code'] = party TOFIX: not a JSON serialisable
                # self.request.session['code'] = party
                # self.request.session['party_code'] = PartySerialiser(party).data # this gets the serilaised json object party with all attributes
                self.request.session['party_code'] = PartySerialiser(party).data['code']
                return Response({'message:' 'Joined Party.'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid Party Code.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid post data, failed to find a code key'}, status=status.HTTP_400_BAD_REQUEST)


class CreateParty(APIView):
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
                party.votes_to_skip = votes_to_skip
                party.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(PartySerialiser(party).data, status=status.HTTP_200_OK)
            else:
                party = Party(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                party.save()
                return Response(PartySerialiser(party).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class UserInParty(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('party_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)


class LeaveParty(APIView):
    def post(self, request, format=None):
        if 'party_code' in self.request.session:
            self.request.session.pop('party_code')
            host_id = self.request.session.session_key
            party_result = Party.objects.filter(host=host_id)
            if len(party_result) > 0:
                party = party_result[0]
                party.delete()

        # TODO: different response when the user is not in the party
        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)


# update the party if the user is the host
class UpdateParty(APIView):
    serializer_class = UpdatePartySerialiser

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serialiser = self.serializer_class(data=request.data)
        
        if serialiser.is_valid():
            guest_can_pause = serialiser.data.get('guest_can_pause')
            votes_to_skip = serialiser.data.get('votes_to_skip')
            code = serialiser.data.get('code')

            queryset = Party.objects.filter(code=code)
            if not queryset.exists():
                return Response({'Message': 'Party Not Found'}, status=status.HTTP_404_NOT_FOUND)

            party = queryset[0]
            user_id = self.request.session.session_key
            if party.host != user_id:
                return Response({'Message': 'You are not the host of this party!'}, status=status.HTTP_403_FORBIDDEN)

            party.guest_can_pause = guest_can_pause
            party.votes_to_skip = votes_to_skip
            party.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            return Response(PartySerialiser(party).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)



