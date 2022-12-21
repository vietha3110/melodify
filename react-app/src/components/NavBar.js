import React from 'react';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/Login';
import SignUpFormModal from './auth/SignUp';
import ProfileDropdown
  from './auth/ProfileDropDown';
const NavBar = () => {
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
          <LoginFormModal/>
          <SignUpFormModal/>
      </div>
      <div>
        <ProfileDropdown />
      </div>
    </div>
  );
}

export default NavBar;
