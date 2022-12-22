import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as playlistAction from '../../../store/playlist';

const PlaylistForm = () => {
    const [validationErrors, setValidationErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); 
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
     //validation 100 for name
    //validation 300 for desc

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        const errors = {}
        if (name.length <= 0 || name.length > 100) {
            errors.name = 'Name must be less than 100 characters.';
            console.log('im running');
        }
        if (name.trim() === "") {
            errors.name = 'Name can not be blank.';
        }
        if (description.length > 200) {
            errors.description = 'Description must be less than 200 characters.';
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        dispatch(playlistAction.makePlaylist({ name, description }));
    }
    
    return (
        <div>
            <div>
                <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg'/>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        placeholder='Add a name (required *)'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        // required
                    />
                    <p className="error-label">
                        {errors.name}
                    </p>
                </div>
                <div>
                    <textarea
                        type='text'
                        placeholder='Add an optional description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <p className="error-label">
                        {errors.description}
                    </p>
                </div>
                <div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )

}

export default PlaylistForm;
