import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as playlistAction from '../../../store/playlist';

const UpdatePlaylistForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); 
    const dispatch = useDispatch();
    //validation 100 for name
    //validation 300 for desc

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('make a playlist')
        setErrors([]);
        // if (name.length <= 0 || name.length > 100) {
        //     setErrors()
        // }
        console.log(description, name);
        dispatch(playlistAction.makePlaylist({ name, description }));
    }
    
    return (
        <div>
            <div>
                <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg'/>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Add a name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        type='text'
                        placeholder='Add an optional description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )

}

export default UpdatePlaylistForm;
