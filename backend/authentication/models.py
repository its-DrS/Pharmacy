from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    ADMIN = "admin"
    PHARMACIEN = "pharmacien"
    PREPARATUEUR = "preparateur"
    CAISSIER = "caissier"
    CLIENT = "client"
    ROLES = [
        (ADMIN , "Administarteur"),
        (PHARMACIEN, "Pharmacien"),
        (PHARMACIEN, "Preparateur"),
        (CAISSIER, "Caissier"),
        (CLIENT, "Client")
    ]
    phone = models.CharField(max_length=8, validators=[MinLengthValidator(8)])
    email = models.EmailField(max_length=50, unique=True)
    role = models.CharField(max_length = 30, choices = ROLES, default = CLIENT)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
