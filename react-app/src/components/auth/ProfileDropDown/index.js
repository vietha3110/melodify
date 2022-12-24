import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton"

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
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
                <span>Profile</span>
            </button>
            {
                showMenu && 
                <div className="profile-dropdown">
                    <div>
                        <span>Hello, {user.firstName}</span>        
                    </div> 
                    <div>
                        <LogoutButton/>
                    </div>    
                </div>
            }

           
        </div>
    )
}

export default ProfileDropdown;
