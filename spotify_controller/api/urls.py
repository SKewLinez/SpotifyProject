from django.urls import path
from .views import PartyView, CreatePartyView, GetParty

urlpatterns = [
    path('home', PartyView.as_view()),
    path('create-party', CreatePartyView.as_view()),
    path('get-party', GetParty.as_view())
]
