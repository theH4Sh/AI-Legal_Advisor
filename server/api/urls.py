from django.urls import path

from .views import create_chat, get_chat

urlpatterns = [
	path("", get_chat),
	path("create/", create_chat)
]