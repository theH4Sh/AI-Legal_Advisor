from django.contrib import admin
from .models import LegalDocument

# Register your models here.

@admin.register(LegalDocument)
class LegalDocumentAdmin(admin.ModelAdmin):
	list_display = ('title', 'uploaded_by', 'uploaded_at')
	search_fields = ('title',)
	readonly_fields = ('uploaded_by', 'uploaded_at')

	def save_model(self, request, obj, form, change):
		if not obj.uploaded_by_id:
			obj.uploaded_by = request.user
		super().save_model(request, obj, form, change)