import { useEffect, useState } from "react";
import * as queueAction from "../../../store/queue";
import { useDispatch } from "react-redux";

const Search = () => {
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (input.trim() === "") {
            setShowResult(false);
            return;
        }
        const searchInput = input.toLowerCase();
        const result = fetch(`/api/songs/search/${searchInput}`)
            .then(res => res.json())
            .then(res => {
                setShowResult(true);
                if (res.length === 0) {
                    setSearchResult([]);
                }
                setSearchResult(res);
            })
            .catch(e => console.log(e));
    }, [input]); 

    useEffect(() => {
        document.addEventListener('click', e => {
            clearSearch();
        });
    }, []);



    const onSongClick = (song) => () => {
        const songInfo = { name: song.song, id: song.id, artistName: song.artist };
        dispatch(queueAction.updateList({ list: [songInfo]}));
        clearSearch();
    };

    const clearSearch = () => {
        setShowResult(false);
        document.getElementById("left-search").style.border = "1px solid #cccccc";
    }; 

    const onChange = (e) => {
        setInput(e.target.value);
        // document.getElementById("left-search").style.border = "4px solid #d60017";

    };

    const onFocus = () => {
        document.getElementById("left-search").style.border = "4px solid #d60017";
    };
    


    return (
        <div className='app-left-search' style={{ cursor: "default" }} id='left-search'>
            <span className="material-symbols-outlined" style={{ padding: 8, cursor: "default" }}>
                search
            </span>
            <input
                className="search-input"
                placeholder="Search"
                value={input}
                onChange={onChange}
                // onBlur={clearSearch}
                onFocus={onFocus}
            />
            {
                searchResult.length > 0 && showResult &&
                < div className='search-result' >
                    {
                        searchResult.map(ele => (
                            <div>
                                <div className="search-result-song">
                                    <div className="search-play-button">
                                        <i className="fa-solid fa-play" id="play-btn" onClick={onSongClick(ele)}></i>
                                    </div>
                                    <div className="search-result-info">
                                        <span className="search-result-songname">{ele.song}</span>
                                        <span className="search-result-artist">{ele.artist}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            {
                searchResult.length === 0 && showResult &&
                <div className='search-result no-result'>
                    <span className="search-result-no">Oops, looks like the song you were looking for isn't available 😔. </span>
                </div>
            }
        </div>
    )
}

export default Search;
