import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const inputRef = useRef();
  const [inputValues, setInputValues] = useState({
    roomName: '',
    username: '',
  });
  const { push } = useHistory();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleOnChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleOnClick = () => {
    push(`/room/${inputValues.roomName}/${inputValues.username}`);
  };

  return (
    <div>
      <h1>Join A Room</h1>
      <div>
        <input
          type='text'
          name='roomName'
          placeholder='Room name'
          ref={inputRef}
          value={inputValues.roomName}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={inputValues.username}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <button type='submit' onClick={handleOnClick}>
        Enter Room
      </button>
    </div>
  );
};

export default Home;
