import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const Room = () => {
  const [roomInfo, setRoomInfo] = useState({
    roomName: '',
    username: '',
  });
  const { roomName, username } = useParams();
  const [msg, setMsg] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [socket, setSocket] = useState({});

  useEffect(() => {
    const fetchRoomInfo = async () => {
      const res = await axios.get(`/room/${roomName}/${username}`);

      setRoomInfo({
        roomName: res.data.room_name,
        username: res.data.username,
      });
      setMsg(res.data.messages);
    };

    fetchRoomInfo();

    // Connect sockets
    const socket = new WebSocket(`ws://localhost:5000/ws/${roomName}/`);

    setSocket(socket);
  }, []);

  // Handle socket events
  socket.onmessage = (e) => {
    const message = JSON.parse(e.data);

    setMsg([...msg, { message: message.message, username: message.username }]);
  };

  socket.onclose = (e) => {
    console.log('On close');
  };

  const sendMessage = () => {
    socket.send(
      JSON.stringify({
        message: newMsg,
        username: username,
        room_name: roomName,
      })
    );

    setNewMsg('');
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <h1>
        Room:{' '}
        {roomInfo.roomName.charAt(0).toUpperCase() + roomInfo.roomName.slice(1)}
      </h1>
      <div style={{ marginTop: '70px', marginBottom: '70px' }}>
        <h2>Messages</h2>
        {msg.map((message) => (
          <div key={uuid()}>
            <p>{message.content}</p>
            <h6>{message.username}</h6>
          </div>
        ))}
      </div>
      <input
        type='text'
        name='room-name'
        placeholder='Message'
        style={{ marginTop: '15px' }}
        onChange={(e) => setNewMsg(e.target.value)}
        value={newMsg}
      />
      <button type='submit' onClick={sendMessage}>
        Send
      </button>
      <p>Username: {roomInfo.username}</p>
    </div>
  );
};

export default Room;
