import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  //set validation for email
  //set validation for password
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  return (
    <form onSubmit={onLogin} className='login-container'>
      <div className='login-header'>
        <div className='login-header-logo'>
          <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg'/>
        </div>
        <div className='login-header-title'>
          <span>Login</span>
        </div>
      </div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-content'>
        <div className='login-email'>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='login-password'>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
      </div>
      <div className='login-button'>
        <button type='submit'>Login</button>
      </div>
      <div>
          Create new Account!
      </div>
      
    </form>
  );
};

export default LoginForm;
