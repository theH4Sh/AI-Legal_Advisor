from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ChatSerializer, MessageSerializer, GeneratedDocumentSerializer
from .models import Chat, Message
from django.http import FileResponse, HttpResponseBadRequest
from django.conf import settings
import os, uuid
from .models import GeneratedDocument
from .utils import generate_docx_from_template
from .LLM_RESPONSE import get_llm_response, get_urdu_llm_response
from .RAG.retrieval import retrieve

#Get chats of a user.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
	language = request.data.get("language")

	if language == "urdu":
		response = get_urdu_llm_response(content)
	else:
		response = retrieve(content)

	user_msg = Message.objects.create(chat=chat, sender="user", content=content)
	#Fake bot response
	# bot_msg = Message.objects.create(chat=chat, sender="bot", content="Fuck You")
	bot_msg = Message.objects.create(chat=chat, sender="bot", content=response)
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
	language = request.data.get("language")
	#print(language)
	if not content:
		return Response({"error" : "Content cannot be empty"}, status=400)

	data = {
		"chat" : chat_id,
		"sender" : "user",
		"content" : content
	}

	if language == "urdu":
		response = get_urdu_llm_response(content)
	else:
		response = retrieve(content)

	serializer = MessageSerializer(data=data)
	if serializer.is_valid():
		user_msg = serializer.save()

		#Fake bot reply
		#bot_msg = Message.objects.create(chat=chat, sender="bot", content="Fuck You")
		bot_msg = Message.objects.create(chat=chat, sender="bot", content=response)

		return Response({
			"user": MessageSerializer(user_msg).data,
			"bot": MessageSerializer(bot_msg).data
		}, status=201)

	return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_document(request):
    """
    POST payload:
    {
      "template_name": "rental_agreement",
      "context": { ... },
      "save": true
    }
    """
    template_name = request.data.get("template_name")
    context = request.data.get("context", {})
    save_flag = request.data.get("save", False)

    if not template_name:
        return HttpResponseBadRequest("template_name is required")

    # Path to predefined templates (store .docx here)
    template_path = os.path.join(settings.BASE_DIR, "media", "templates", f"{template_name}.docx")
    if not os.path.exists(template_path):
        return Response({"error": "Template not found"}, status=404)

    # Output file path
    out_filename = f"{template_name}_{request.user.username}_{uuid.uuid4().hex[:8]}.docx"
    out_dir = os.path.join(settings.MEDIA_ROOT, "generated_docs")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, out_filename)

    # Generate the document
    generate_docx_from_template(template_path, context, out_path)

    # Save record (optional)
    if save_flag:
        GeneratedDocument.objects.create(
            user=request.user,
            template_name=template_name,
            file=f"generated_docs/{out_filename}"
        )

    # Return file
    return FileResponse(open(out_path, 'rb'), as_attachment=True, filename=out_filename)

#get generated docs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_generated_docs(request):
    docs = GeneratedDocument.objects.filter(user=request.user).order_by('-created_at')
    serializer = GeneratedDocumentSerializer(docs, many=True, context={'request': request})
    return Response(serializer.data)
