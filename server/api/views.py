from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ChatSerializer
from .models import Chat

@api_view(['GET'])
def get_chat(request):
	chats = Chat.objects.all()
	serializer = ChatSerializer(chats, many=True)
	return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chat(request):

	chat = Chat.objects.create(user=request.user)
	serializer = ChatSerializer(chat)

	return Response(serializer.data, status=201)