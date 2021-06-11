import axios from 'axios';
import { useState } from 'react';

// Append CSRF token on every request
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const createNewUser = async () => {
    const res = await axios.post('/user/register/', newUser);
  };

  const handleOnChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={createNewUser}>
        <div>
          <input
            type='text'
            name='name'
            placeholder='Name'
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
