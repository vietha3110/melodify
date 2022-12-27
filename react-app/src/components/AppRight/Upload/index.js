import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as songActions from "../../../store/song";
import { useHistory } from "react-router-dom";

function readAsUtf8String(file) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
        fileReader.onloadend = () => {
            if (fileReader.error) {
                reject(fileReader.error);
            } else {
                const result = Array.from(new Uint8Array(fileReader.result));
                resolve(result);
            }
        };
    });
}

function readAsDataURL(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        fileReader.onloadend = () => {
            if (fileReader.error) {
                reject(fileReader.error);
            } else {
                resolve(fileReader.result);
            }
        };
    });
}

function getDuration(dataUrl) {
    const audio = new Audio();
    audio.src = dataUrl;

    return new Promise((resolve) => {
        audio.onloadedmetadata = () => {
            resolve(Math.round(audio.duration));
        };
    });
}

const UploadSong = () => {
    const [file, setFile] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [artist_name, setArtistName] = useState('');
    const [genre, setGenre] = useState('pop');
    const [length, setLength] = useState(0);
    const [fileStatus, setFileStatus] = useState('NOT_LOADED');
    const dispatch = useDispatch();
    const history = useHistory();
    const [temp, setTemp] = useState(null);
    const [submitStatus, setSubmitStatus] = useState('NOT_SUBMITTING');

    const updateFile = async (e) => {
        setFileStatus('LOADING');
        const file = e.target.files[0];

        if (file.type !== "audio/mpeg") {
            setError('Please upload mp3, ')
        }

        if (file.size > 5000000) {
            return setError('Please upload file below 5mb');
        }

        const binaryString = await readAsUtf8String(file);
        const dataUrl = await readAsDataURL(file);
        const duration = await getDuration(dataUrl);
        setLength(duration);
        setFile(binaryString);
        setFileStatus('LOADED');
    }

    const handleSelect = (e) => {
        setGenre(e.target.value)
    }


    const handleSubmit = async (e) => {
        setSubmitStatus('SUBMITTING');
        e.preventDefault();
        const audioFile = file;
        const song = { name, artist_name, genre, length, audioFile };
        await dispatch(songActions.createSong(song));
        setSubmitStatus('SUBMITTED');
        history.push('/');
    }

    const isSubmitEnabled = fileStatus === 'LOADED' && name !== '' && artist_name !== '' && submitStatus === 'NOT_SUBMITTING';

    return (
        <div className="uploadsong-container" onSubmit={handleSubmit} >
            {/* <audio controls>
                <source src="http://localhost:5000/api/songs/file"/>
            </audio> */}

            <form className="uploadsong-form">
                <div className="uploadsong-title">
                    <h1>Drop your music here</h1>
                </div>
                
                <div className="uploadsong-content">
                    <div className="uploadsong-name uploadinfo">
                        <label> Title:</label>
                        <input
                            type="text"
                            placeholder="ADD NAME"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="uploadsong-genre uploadinfo">
                        <label>Genre: </label>
                        <select onChange={handleSelect}>
                            <option value="pop">Pop</option>
                            <option value="rnb">R&B</option>
                            <option value="rock">Rock</option>
                            <option value="electronic">Electronic</option>
                            <option value="classical">Classical</option>
                            <option value="hiphop">Hiphop & Rap</option>
                        </select>

                    </div>
                    <div className="uploadsong-artist uploadinfo">
                        <label>Artist: </label>
                        <input
                            type="text"
                            placeholder="Artist name"
                            value={artist_name}
                            onChange={e => setArtistName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="uploadsong-upload uploadinfo">
                        <input
                            type="file"
                            onChange={updateFile}
                        />
                    </div>
                    {
                        error && 
                        <div>
                            {error}
                        </div>
                    }
                    {
                        fileStatus === "LOADING" &&
                        <div>Loading file</div>
                    }
                    <div className="uploadsong-btnupload">
                        <button type="submit" disabled={!isSubmitEnabled}>{submitStatus === 'SUBMITTING' ? 'Uploading' : 'Upload'}</button>
                    </div>
                </div>
            </form>
           
            <div>
                <p>By uploading, you confirm that your file comply with our Terms of Use and you don't infringe anyone else's rights.</p>
            </div>
        </div>
    )
}

export default UploadSong;
