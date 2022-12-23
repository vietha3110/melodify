import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileDropdown from './auth/ProfileDropDown';
import { Modal } from './Modal';
import LoginForm from './auth/Login/LoginForm';
const NavBar = () => {
  const user = useSelector(state => state.session.user); 
  const [showModal, setShowModal] = useState(false);
  

  // const onClose = () => {
  //   console.log('here');
  //   setShowModal(false);
  // };

  
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
          <div className='navbar-signin' onClick={() => setShowModal(true)}>
              <span>Sign in</span>
              {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm onClose={() => setShowModal(false)}/>
                    </Modal>
                )}
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
