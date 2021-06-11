from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Account
from .serializers import AccountSerializer
import bcrypt

@api_view(['POST'])
def register(request):
  raw_password = bytes(request.data['password'], encoding='utf-8')
  hashedPassword = bcrypt.hashpw(raw_password, bcrypt.gensalt())
  serializer = AccountSerializer(data={
    'name': request.data['name'],
    'email': request.data['email'],
    'password': hashedPassword.decode('utf-8')
  })

  if serializer.is_valid():
    serializer.save()

  return Response({ 'status': 200 })