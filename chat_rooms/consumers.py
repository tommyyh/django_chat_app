import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Messages

class ChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.room_name = self.scope['url_route']['kwargs']['room_name']
    self.room_group_name = f'chat_{self.room_name}'

    # Join room
    await self.channel_layer.group_add(
      self.room_group_name,
      self.channel_name
    )

    await self.accept()

  async def disconnect(self, code):
    # Disconnect from the room
    await self.channel_layer.group_discard(
      self.room_group_name,
      self.channel_name
    )

  async def receive(self, text_data):
    data = json.loads(text_data)
    message = data['message']
    username = data['username']
    room = data['room_name']

    # Save message
    await self.store_message(username, room, message)

    await self.channel_layer.group_send(
      self.room_group_name, {
        'type': 'chat_message',
        'message': message,
        'username': username,
      }
    )

  async def chat_message(self, event):
    message = event['message']
    username = event['username']

    # Send msg to WebSockets
    await self.send(text_data=json.dumps({
      'message': message,
      'username': username
    }))

  @sync_to_async
  def store_message(self, username, room, message):
    Messages.objects.create(
      username = username,
      room = room,
      content = message
    )