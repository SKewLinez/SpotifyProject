from django.db import models

# Create your models here.
class Party(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    received_votes = models.IntegerField(null=False, default=0)
    guest_can_pause = models.BooleanField(null=False, default=False)
    created_at = models.DateTimeField(autp_now_add=True)