import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = (e) => {
    e.stopPropagation();
    dispatch(logout());
  };

  return <button onClick={onLogout} className='btn-signout'>Sign Out</button>;
};

export default LogoutButton;
