import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileDropdown from './AppRight/auth/ProfileDropDown';
import { Modal } from './Modal';
import LoginForm from './AppRight/auth/Login/LoginForm';
const NavBar = () => {
  const user = useSelector(state => state.session.user); 
  const [showModal, setShowModal] = useState(false);
  
  const handleClick = (e) => {
    e.stopPropagation();
    console.log('someone click me?')
    setShowModal(true);
  }
  console.log('re-render');
  
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
          <div className='navbar-signin' >
              <span onClick={handleClick}>Sign in</span>
              {showModal && (
                    <Modal>
                        <LoginForm onClose={() => setShowModal(false)}/>
                    </Modal>
                )}
          </div>
        }
      
      
        {user !== null &&
          <div>
            <ProfileDropdown />
          </div>
        }
      </div>
    </div>
  );
}

export default NavBar;
