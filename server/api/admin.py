from django.contrib import admin
from .models import LegalDocument, GeneratedDocument
from .RAG.process_pdf import process_new_pdf
import os

# Register your models here.
#for laws_pdf
@admin.register(LegalDocument)
class LegalDocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_by', 'uploaded_at')
    search_fields = ('title',)
    readonly_fields = ('uploaded_by', 'uploaded_at')

    def save_model(self, request, obj, form, change):
        is_new = obj.pk is None  # detect if new file is being added

        if not obj.uploaded_by_id:
            obj.uploaded_by = request.user

        super().save_model(request, obj, form, change)

        # Process the file only on new upload
        if is_new and obj.file:
            file_path = obj.file.path
            if os.path.exists(file_path):
                try:
                    print(f"🚀 Processing new document: {file_path}")
                    process_new_pdf(file_path)
                    print("✅ PDF successfully added to FAISS vector store.")
                except Exception as e:
                    print(f"❌ Error while processing PDF: {e}")

@admin.register(GeneratedDocument)
class GeneratedDocumentAdmin(admin.ModelAdmin):
    list_display = ("template_name", "user", "created_at")
    readonly_fields = ("created_at",)