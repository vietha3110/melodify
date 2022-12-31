import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileDropdown from './AppRight/auth/ProfileDropDown';
import { Modal } from './Modal';
import LoginForm from './AppRight/auth/Login/LoginForm';
import logoNote from './logonote.png';
const NavBar = () => {
  const user = useSelector(state => state.session.user); 
  const [showModal, setShowModal] = useState(false);
  
  const handleClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  }
  
  return (
    <div className='navbar-container'>
      <div className='navbar-player'>
        Player
      </div>
      <div className='navbar-logo'>
        <div className='navbar-logo-img'>
          <img src={logoNote} style={{width: '1.5rem'}} />
        </div>
        <div className='navbar-logo-gif'>
          <div className="boxContainer">
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
            <div className="box box4"></div>
            <div className="box box5"></div>
          </div>
        </div>
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
