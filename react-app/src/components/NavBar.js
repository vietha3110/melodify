import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/Login';
import SignUpFormModal from './auth/SignUp';
import ProfileDropdown from './auth/ProfileDropDown';
import { Modal } from './Modal';
import LoginForm from './auth/Login/LoginForm';
const NavBar = () => {
  const user = useSelector(state => state.session.user); 
  
  return (
    <div className='navbar-container'>
      <div className='navbar-player'>
        Player
      </div>
      <div className='navbar-logo'>
        Logo 
      </div>
      <div className='navbar-volume'>
        volume
      </div>
      <div className='navbar-next'>
        <button>Open Next</button>
      </div>
      <div className='navbar-button-signin'>
        {user == null && 
          <div>
            <LoginFormModal/>
            <SignUpFormModal/>
          </div>
        }
      </div>
      <div>
        <ProfileDropdown />
      </div>
    </div>
  );
}

export default NavBar;
