import { useEffect, useState } from "react";
const Search = () => {
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
  
    useEffect(() => {
        if (input.trim() === "") {
            return;
        }
        const searchInput = input.toLowerCase();
        const result = fetch(`/api/songs/search/${searchInput}`)
        .then(res => res.json())
        .then(res => {
            setSearchResult(res);
        })
        .catch(e => console.log(e));
    }, [input])
    
    return (
        <div className='app-left-search' style={{cursor:"default"}}>
            <div>
                <span className="material-symbols-outlined" style={{padding: 8, cursor:"default"}}>
                    search
                </span>
                <input
                    className="search-input"
                    placeholder="Search"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
            </div>
            {
                searchResult.length > 0 && 
                    searchResult.map(ele => (
                        <div style={{backgroundColor:"red"}}>
                            {ele.song}
                        </div>
                    ))
            }
            
        </div>
    )
}

export default Search;
