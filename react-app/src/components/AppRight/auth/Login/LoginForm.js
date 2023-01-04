import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../../store/session';
import { signUp } from '../../../../store/session';
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
  
  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );
 
  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data === null) {
      onClose();
    }
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    const email = "demo@aa.io";
    const password = "password";
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data === null) {
      onClose();
    }
    if (data) {
      setErrors(data);
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault(); 
    setErrors([]);
    if (!emailSignUp.trim().match(regex)) {
      setErrors(['Please provide a valid Email.']);
      return;
    }

    if (passwordSignUp.length < 6) {
      setErrors(["Password must be greater than 6 characters."]);
      return;
    }
    
    const data = await dispatch(signUp(firstName,lastName,emailSignUp, passwordSignUp));
    if (data) {
      setErrors(data);
    }
  };

  const changeContent = (e) => {
    e.preventDefault();
    setErrors([]);
    setShowSignIn(false);
  }

  const changeSignIn = (e) => {
    e.preventDefault();
    setErrors([]);
    setShowSignIn(true);
  }
  
  const closeLogin = (e) => {
    e.stopPropagation();
    onClose();
  }

  return (
    <>
      <div onClick={closeLogin} className="login-main-close">
          <i className="fa-solid fa-xmark"></i>
      </div>
      {
        showSignIn && (
        <>  
        <div>
          <form onSubmit={onLogin} className='login-container'>
            <div className='login-header'>
              <div className='login-header-logo'>
                <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg'  alt='login'/>
              </div>
              <div className='login-header-title'>
                <span>Welcome back!</span>
              </div>
            </div>
            <div className='login-content'>
              <div className='login-email login-info'>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required  
                />
              </div>
              <div className='login-password login-info'>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                </div>
                  {
                    errors.length > 0 && (
                      <div className='login-error'>
                        <span>Invalid data! Please try again!</span>
                      </div>
                  )}
              <div className='login-button login-info'>
                <button type='submit'>Login</button>
            </div>
            </div>
          
            <div onClick={changeContent} className="login-change-signup">
              <span>Create an account!</span>
              </div>
              <div onClick={demoLogin} className="login-change-signup" style={{margin: "5px"}}>
                  <span>Login as Demo User</span>
              </div>
                </form>
          </div>
          </>
        )
      }
      {
        !showSignIn && (
        <form onSubmit={onSignUp} className='signup-container'>
         <div className='signup-header-logo'>
            <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg' alt='signup'/>
          </div>
          <div className='signup-header-title'>
            <span>Create melodify account</span>
          </div>
        <div>
              {
                errors.map((error, ind) => (
                <div key={ind} className='signup-error-label'>{error}</div>
                ))
              }
        </div>
        <div className='signup-content'>
          <div className='signup-firstname signup-info'>
            <input
              type='text'
              name='firstname'
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              value={firstName}
              required  
            ></input>
          </div>
          <div className='signup-lastname signup-info'>
            <input
              type='text'
              name='lastname'
              onChange={e => setLastName(e.target.value)}
              placeholder='Last Name'
              value={lastName}
              required  
            ></input>
          </div>
          <div className='signup-email signup-info'>
            <input
              type='email'
              name='email'
              onChange={e => setEmailSignUp(e.target.value)}
              placeholder='Email'
              value={emailSignUp}
              required
              />
          </div>
          <div className='signup-password signup-info'>
            <input
              type='password'
              name='password'
              onChange={e => setPasswordSignUp(e.target.value)}
              value={passwordSignUp}
              placeholder='Password'
              required  
              />
          </div>
          <div className='signup-button signup-info'>
            <button type='submit'>Sign Up</button>
          </div>
        </div>
          <div onClick={changeSignIn} className='signup-change'>
            <span>Already have an account? Login instead</span>
          </div>
      </form>
      )}
    </>   
  );
};

export default LoginForm;
