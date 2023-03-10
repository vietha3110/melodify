import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
    const [showMenu, setShowMenu] = useState(false); 
    const user = useSelector(state => state.session.user);
    
    const openMenu = (e) => {
        e.stopPropagation();
        setShowMenu(true);
    }
    useEffect(() => {
        document.addEventListener('click', e => {
            e.stopPropagation();
            setShowMenu(false);
        });
    });

    return (
        <div>
            <button onClick={openMenu} className="profile-user-btn">
                <i className="fas fa-user-circle" />
            </button>
            {
                showMenu && 
                <div className="profile-dropdown">
                    <div  className="profile-dropdown-info profile-hover">
                        <span className="profile-dropdown-content" style={{cursor:"default"}}>Hello, {user.firstName}</span>        
                    </div> 
                    <Link to='/upload' className="profile-dropdown-info profile-hover">
                          <span className="profile-dropdown-content">Upload  </span>
                    </Link>
                    <Link to='/profile'  className="profile-dropdown-info profile-hover">
                         <span className="profile-dropdown-content">Account</span>       
                    </Link>    
                    <div className="profile-logout profile-hover">
                        <LogoutButton/>
                    </div>    
                </div>
            }

           
        </div>
    )
}

export default ProfileDropdown;
