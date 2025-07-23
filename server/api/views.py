from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ChatSerializer
from .models import Chat

@api_view(['GET'])
def get_chat(request):
	chats = Chat.objects.all()
	serializer = ChatSerializer(chats, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def create_chat(request):
	serializer = ChatSerializer(data = request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data, status=201)

	return Response(serializer.errors, status=400)