import { useState } from "react";
import EditFormModal from "./Edit/EditFormModal";
import DeleteFormModal from "./Delete/DeleteFormModal";

const UpdateBox = ({ playlist, i, openModal, closeModal }) => {
    const [open, setOpen] = useState({});

    const handleClickBtn = (i) => (e) => {
        e.stopPropagation();
        const newOpens = {
            ...open,
            [i]: !open[i]
        };
        setOpen(newOpens);
    }

    const closeDropdown = () => {
        setOpen(false);
    };

    return (
        <div className="playlist-content-name-button">
            <button className='updatebox-btn' onClick={handleClickBtn(i)}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            {open[i] &&
                <div className="updatebox-dropdown">
                    <div className="updatebox-dropdown-update updatebox-info">
                        <EditFormModal playlist={playlist} closeDropdown={closeDropdown} openModal={openModal} closeModal={closeModal} />
                    </div>
                    <div className="updatebox-dropdown-delete updatebox-info">
                        <DeleteFormModal playlist={playlist} closeDropdown={closeDropdown} openModal={openModal} closeModal={closeModal}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default UpdateBox;
