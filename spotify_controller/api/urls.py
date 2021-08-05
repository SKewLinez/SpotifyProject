from django.urls import path
from api.views import PartyView

urlpatterns = [
    path('home', PartyView.as_view()),
]