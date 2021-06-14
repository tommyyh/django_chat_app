from rest_framework.decorators import api_view
from rest_framework.response import Response
from chat_rooms.models import Messages
from .serializers import MessageSerializer

@api_view(['GET'])
def room(request, room_name, username):
  usernameValue = 'anonymous' if not username else username
  messages = Messages.objects.filter(room = room_name)
  serializer = MessageSerializer(messages, many=True)
  context = {
    'room_name': room_name,
    'username': usernameValue,
    'messages': serializer.data
  }

  return Response(context)