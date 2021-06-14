import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Append CSRF token on every request
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const { push } = useHistory();

  const createNewUser = async (e) => {
    e.preventDefault();

    const res = await axios.post('/user/register/', newUser);

    if (res.data.status === 201) {
      push('/login');
    } else {
      setErrorMsg('There was an error creating your account');
    }
  };

  const handleOnChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <p>{errorMsg}</p>
      <h1>Register</h1>
      <form onSubmit={(e) => createNewUser(e)}>
        <div>
          <input
            type='text'
            name='name'
            placeholder='Name'
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
      <Link to='/login'>Login</Link>
    </div>
  );
};

export default Register;
