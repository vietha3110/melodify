import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = (e) => {
    e.stopPropagation();
    dispatch(logout());
    // <Redirect to='/'/>
  };

  return <button onClick={onLogout} className='btn-signout'>Sign Out</button>;
};

export default LogoutButton;
