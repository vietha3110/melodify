import { useEffect } from "react";
import EditPlaylistForm from "./EditPlaylistForm";

const EditFormModal = ({ playlist, closeDropdown, openModal, closeModal }) => {
    const onClick = (e) => {
        e.stopPropagation();
        openModal(
            <EditPlaylistForm playlist={playlist} onClose={() => closeModal()} />
        );
        closeDropdown();
    };
    useEffect(() => {
        document.addEventListener('click', e => {
            closeDropdown();
        });
    },[]);

    return (
        <button onClick={onClick} className='btn-edit'>
            <span className="updateform-spanedit">Edit</span>
        </button>
    );
}

export default EditFormModal;
