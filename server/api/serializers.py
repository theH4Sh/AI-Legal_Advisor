from rest_framework import serializers
from .models import Chat, Message, GeneratedDocument
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

class GeneratedDocumentSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = GeneratedDocument
        fields = ['id', 'template_name', 'file', 'download_url', 'created_at']

    def get_download_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.file.url)
        return f"{settings.MEDIA_URL}{obj.file}"