import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { push } = useHistory();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await axios.post('/user/login/', credentials);

    if (res.data.status === 200) {
      setCredentials({
        email: '',
        password: '',
      });

      push('/');
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => loginUser(e)}>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={(e) => handleOnChange(e)}
            value={credentials.email}
            required
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={(e) => handleOnChange(e)}
            value={credentials.password}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <Link to='/register'>Register</Link>
    </div>
  );
};

export default Login;
