from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import LegalDocument, GeneratedDocument
import os

@receiver(post_delete, sender=LegalDocument)
def delete_file_on_model_delete(sender, instance, **kwargs):
	"""Delete file from system when corresponding file is deleted""" 
	if instance.file and os.path.isfile(instance.file.path):
		os.remove(instance.file.path)


@receiver(post_delete, sender=GeneratedDocument)
def delete_generated_doc_on_delete(sender, instance, **kwargs):
    """Delete file from system when GeneratedDocument is deleted"""
    if instance.file and os.path.isfile(instance.file.path):
        os.remove(instance.file.path)