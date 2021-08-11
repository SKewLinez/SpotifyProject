from django.db import models
import string 
import random

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Party.objects.filter(code=code).count() == 0: break
    return code


# Create your models here.
class Party(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    votes_to_skip = models.IntegerField(null=True, default=0)
    guest_can_pause = models.BooleanField(null=False, default=False)
    created_at = models.DateTimeField(auto_now_add=True)