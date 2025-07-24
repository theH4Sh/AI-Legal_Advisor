from rest_framework import serializers
from .models import Chat, Message
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'username']

class MessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Message
		fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
	user = UserSerializer(read_only=True)
	messages = MessageSerializer(many=True ,read_only=True)

	class Meta:
		model = Chat
		fields = ['id', 'created_at', 'user', 'messages']