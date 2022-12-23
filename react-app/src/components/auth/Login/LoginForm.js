import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import LoginContent from '.';
import { signUp } from '../../../store/session';
const LoginForm = ({onClose}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const [showSignIn, setShowSignIn] = useState(true);
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
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

  const onSignUp = async (e) => {
    e.preventDefault(); 
    setErrors([])
    const data = await dispatch(signUp(firstName,lastName,emailSignUp, passwordSignUp));
    if (data) {
      setErrors(data)
    }
  };

  const changeContent = (e) => {
    e.preventDefault();
    setErrors([])
    setShowSignIn(false);
  }

  const changeSignIn = (e) => {
    e.preventDefault();
    setErrors([])
    setShowSignIn(true);
  }
  
  const closeLogin = (e) => {
    e.stopPropagation();
    onClose();
    console.log('clicked')
  }
  console.log('running')

  return (
    <>
      <div onClick={closeLogin}>
          <i className="fa-solid fa-xmark"></i>
      </div>
      {showSignIn && (
        <>
          
        <div>
          <form onSubmit={onLogin} className='login-container'>
            <div className='login-header'>
              <div className='login-header-logo'>
                <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg' />
              </div>
              <div className='login-header-title'>
                <span>Welcome back!</span>
              </div>
            </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='login-content'>
              <div className='login-email login-info'>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='login-password login-info'>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className='login-button login-info'>
                <button type='submit'>Login</button>
            </div>
            </div>
          
            <div onClick={changeContent}>
              Don't have melodify account? Create an account!
            </div>
                </form>
          </div>
          </>
      )}
      {!showSignIn && (
        <form onSubmit={onSignUp} className='signup-container'>
         <div className='signup-header-logo'>
            <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg' />
          </div>
          <div className='signup-header-title'>
            <span>Create melodify account</span>
          </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='signup-content'>
          <div className='signup-firstname signup-info'>
            <input
              type='text'
              name='firstname'
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              value={firstName}
            ></input>
          </div>
          <div className='signup-lastname signup-info'>
            <input
              type='text'
              name='lastname'
              onChange={e => setLastName(e.target.value)}
              placeholder='Last Name'
              value={lastName}
            ></input>
          </div>
          <div className='signup-email signup-info'>
            <input
              type='email'
              name='email'
              onChange={e => setEmailSignUp(e.target.value)}
              placeholder='Email'
              value={emailSignUp}
            />
          </div>
          <div className='signup-password signup-info'>
            <input
              type='password'
              name='password'
              onChange={e => setPasswordSignUp(e.target.value)}
              value={passwordSignUp}
              placeholder='Password'
            />
          </div>
          
          <div className='signup-button signup-info'>
            <button type='submit'>Sign Up</button>
          </div>
        </div>
          <div onClick={changeSignIn}>
            <span>Already have an account? Login instead</span>
          </div>
      </form>
      )}
    </>
      
        
  );
};

export default LoginForm;
