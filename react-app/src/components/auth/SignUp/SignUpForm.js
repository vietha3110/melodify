import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../../store/session'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );

  const onSignUp = async (e) => {
    e.preventDefault(); 
    // const errors = {};
    // e.preventDefault();
    // if (firstName.length > 0 === false) errors.firstName = "Please enter your first name.";
    // if (lastName.length > 0 === false) errors.lastName = "Please enter your last name.";
    // if (email.length > 0 === false) errors.email = "Please enter your email.";
    // else if (!email.trim().match(regex)) {
    //   errors.email = 'Please provide a valid Email';
    // }

    // if (password.length >= 10 === false) errors.password = "Password must be at least 10 characters long";
    // if (repeatPassword.length > 0 === false) errors.repeatPassword = "Please retype your password.";
    // else if (repeatPassword !== password) errors.repeatPassword = "Passwords must match!";

    // if (Object.keys(errors).length > 0) {
    //   setErrors(errors);
    //   return;
    // }

    const data = await dispatch(signUp(firstName,lastName,emailSignUp, passwordSignUp));
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
          onChange={e => setEmailSignUp(e.target.value)}
          placeholder='Email'
          value={emailSignUp}
        />
      </div>
      <div>
        <input
          type='password'
          name='password'
          onChange={e => setPasswordSignUp(e.target.value)}
          value={passwordSignUp}
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
