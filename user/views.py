from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Account
from .serializers import AccountSerializer
import bcrypt
import jwt
from decouple import config

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

    return Response({ 'status': 201 })
  else:
    return Response({ 'status': 403 })

@api_view(['POST'])
def login(request):
  account = Account.objects.filter(email = request.data['email']).first()
  password = bytes(request.data['password'], encoding='utf-8')

  # Check if user exists
  if not account:
    return Response({ 'status': 404, 'msg': 'Incorrect email address' })

  # If user exists -> Check if password exists
  if bcrypt.checkpw(password, bytes(account.password, encoding='utf-8')):
    payload = {
      'name': account.name,
      'email': account.email,
      'id': account.id,
    }
    encoded_jwt = jwt.encode(payload, config('JWT_SECRET'), algorithm='HS256')

    # Save the token to cookies
    response = Response({ 'status': 200 })
    response.set_cookie('token', encoded_jwt, max_age=None)
    
    # Save the user to the session
    request.session['user'] = payload
    
    return response
  else:
    return Response({ 'status': 403, 'msg': 'Incorrect password' })