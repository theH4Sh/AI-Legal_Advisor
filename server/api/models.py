from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Chat(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chats")
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Chat {self.id} - {self.user.username}"

class Message(models.Model):
	chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
	sender = models.CharField(max_length=10, choices=[("user", "User"), ("bot", "Bot")])
	content = models.TextField()
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Chat {self.sender} - {self.chat} - {self.content}"

class LegalDocument(models.Model):
	title = models.CharField(max_length=255)
	file = models.FileField(upload_to='legal_docs/')
	uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
	uploaded_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Document {self.title}"

class GeneratedDocument(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    template_name = models.CharField(max_length=255)
    file = models.FileField(upload_to="generated_docs/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Document {self.template_name} - User {self.user}"