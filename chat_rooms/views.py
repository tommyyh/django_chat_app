from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def room(request, room_name, username):
  usernameValue = 'anonymous' if not username else username

  return Response({ 'room_name': room_name, 'username': usernameValue })