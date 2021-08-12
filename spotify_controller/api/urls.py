from django.urls import path
from .views import JoinParty, PartyView, CreatePartyView, GetParty

urlpatterns = [
    path('home', PartyView.as_view()),
    path('create-party', CreatePartyView.as_view()),
    path('get-party', GetParty.as_view()),
    path('join-party', JoinParty.as_view())
]
