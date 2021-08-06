from django.urls import path
from .views import PartyView, CreatePartyView
urlpatterns = [
    path('home', PartyView.as_view()),
    path('create-party', CreatePartyView.as_view())
]