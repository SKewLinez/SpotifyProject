from django.urls.conf import path
from .views import index 

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index)
]