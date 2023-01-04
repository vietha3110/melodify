import { useEffect } from "react";
import DeletePlaylistForm from "./DeletePlaylistForm";

const DeleteFormModal = ({ playlist, closeDropdown, openModal, closeModal }) => {
    
    const onClick = (e) => {
        e.stopPropagation();
        openModal(
            <DeletePlaylistForm playlist={playlist} onClose={() => closeModal()} />
        );
        closeDropdown();
    };

    useEffect(() => {
        document.addEventListener('click', e => {
            closeDropdown();
        });
    }, []);

    return (
        <button onClick={onClick} className='deleteform-btn'style={{width:"100%", textAlign:"left"}}>
            <span className="deleteform-span">Delete</span>
        </button>
    );
}

export default DeleteFormModal;
