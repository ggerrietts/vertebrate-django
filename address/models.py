from django.db import models
import common.models

# Create your models here.

class ContactModel(models.Model, common.models.AjaxModelHelper):
	email = models.EmailAddressField()
	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
