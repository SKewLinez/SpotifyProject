from rest_framework import serializers
from .models import Party

class PartySerialiser(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = ('id', 'code', 'host', 'received_votes', 'guest_can_pause', 'created_at')

class CreatePartySerialiser(serializers.ModelSerializer):
    class Meta:
        model = Party
        # fields = ('guest_can_pause', 'received_votes') -- deprecated
        exclude = ('id', 'code', 'host', 'created_at')