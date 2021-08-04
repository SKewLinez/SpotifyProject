from django.urls import path
from .views import PartyView

urlpatterns = [
    path('home', PartyView.as_view()),
]