from django.contrib import admin
from .models import LegalDocument, GeneratedDocument

# Register your models here.
#for laws_pdf
@admin.register(LegalDocument)
class LegalDocumentAdmin(admin.ModelAdmin):
	list_display = ('title', 'uploaded_by', 'uploaded_at')
	search_fields = ('title',)
	readonly_fields = ('uploaded_by', 'uploaded_at')

	def save_model(self, request, obj, form, change):
		if not obj.uploaded_by_id:
			obj.uploaded_by = request.user
		super().save_model(request, obj, form, change)

@admin.register(GeneratedDocument)
class GeneratedDocumentAdmin(admin.ModelAdmin):
    list_display = ("template_name", "user", "created_at")
    readonly_fields = ("created_at",)