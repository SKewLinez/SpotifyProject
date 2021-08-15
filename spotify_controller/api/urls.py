from django.urls import path
from .views import JoinParty, PartyView, CreateParty, GetParty, UserInParty, LeaveParty, UpdateParty
urlpatterns = [
    path('home', PartyView.as_view()),
    path('create-party', CreateParty.as_view()),
    path('get-party', GetParty.as_view()),
    path('join-party', JoinParty.as_view()),
    path('user-in-party', UserInParty.as_view()),
    path('leave-party', LeaveParty.as_view()),
    path('update-party', UpdateParty.as_view())
]
