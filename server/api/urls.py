from django.urls import path

from .views import create_chat, get_chat, send_message, chat_details, generate_document

urlpatterns = [
	path("", get_chat),
	path("create/", create_chat),
	path("<int:chat_id>/details/", chat_details),
	path("<int:chat_id>/message/", send_message),
	path('generate-doc/', generate_document, name='generate-document'),
]