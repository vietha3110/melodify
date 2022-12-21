import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault(); 
    console.log('im running');
    const data = await dispatch(signUp(firstName,lastName,email, password));
    if (data) {
      setErrors(data)
    }
  };


  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          type='text'
          name='firstname'
          onChange={(e) => setFirstName(e.target.value)}
          placeholder='First Name'
          value={firstName}
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='lastname'
          onChange={e => setLastName(e.target.value)}
          placeholder='Last Name'
          value={lastName}
        ></input>
      </div>
      <div>
        <input
          type='email'
          name='email'
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
          value={email}
        />
      </div>
      <div>
        <input
          type='password'
          name='password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder='Password'
        />
      </div>
      <div>
        <span>You acknowledge that you agree to the Melodify Services Terms & Conditions when you select Sign Up.</span>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
