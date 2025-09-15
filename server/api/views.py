from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ChatSerializer, MessageSerializer
from .models import Chat, Message

#Wrong implementation of get, you have to get chats only for a specific user.
@api_view(['GET'])
def get_chat(request):
	chats = Chat.objects.filter(user=request.user)
	serializer = ChatSerializer(chats, many=True)
	return Response(serializer.data)

#Create New Chat
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chat(request):
	chat = Chat.objects.create(user=request.user)
	content = request.data.get("content")

	user_msg = Message.objects.create(chat=chat, sender="user", content=content)
	#Fake bot response
	bot_msg = Message.objects.create(chat=chat, sender="bot", content="Fuck You")
	serializer = ChatSerializer(chat)
	return Response(serializer.data, status=201)

@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def chat_details(request, chat_id):
	try:
		chat = Chat.objects.get(id=chat_id, user=request.user)
	except Chat.DoesNotExist:
		return Response({"error": "Chat not found"}, status=404)

	if request.method == 'GET':
		serializer = ChatSerializer(chat)
		return Response(serializer.data, status=201)

	elif request.method == 'DELETE':
		chat.delete()
		return Response({"message": "Chat deleted"}, status=200)

#Send Message
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request, chat_id):
	try:
		chat = Chat.objects.get(id=chat_id, user=request.user)
	except Chat.DoesNotExist:
		return Response({"Error" : "Chat not found"}, status = 404)

	content = request.data.get("content")
	if not content:
		return Response({"error" : "Content cannot be empty"}, status=400)

	data = {
		"chat" : chat_id,
		"sender" : "user",
		"content" : content
	}

	serializer = MessageSerializer(data=data)
	if serializer.is_valid():
		user_msg = serializer.save()

		#Fake bot reply
		bot_msg = Message.objects.create(chat=chat, sender="bot", content="Fuck You")

		return Response({
			"user": MessageSerializer(user_msg).data,
			"bot": MessageSerializer(bot_msg).data
		}, status=201)

	return Response(serializer.errors, status=400)
