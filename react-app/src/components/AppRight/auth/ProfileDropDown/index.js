import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";
import { Link } from "react-router-dom";
import UserPage from "../../UserPage";

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
                        <span className="profile-dropdown-content">Hello, {user.firstName}</span>        
                    </div> 
                    <div  className="profile-dropdown-info profile-hover">
                          <Link to='/upload' className="profile-dropdown-content">Upload  </Link>
                    </div>
                    <div  className="profile-dropdown-info profile-hover">
                         <Link to='/profile' className="profile-dropdown-content">Account</Link>       
                    </div>    
                    <div className="profile-logout profile-hover">
                        <LogoutButton/>
                    </div>    
                </div>
            }

           
        </div>
    )
}

export default ProfileDropdown;
