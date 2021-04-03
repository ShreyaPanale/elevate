import React,{useContext,useEffect, useState} from 'react';

export const PlayerContext = React.createContext();

export const usePlayer = () => {
    return useContext(PlayerContext);
}

export const PlayerProvider = ({children}) => {

    const [queue, setQueue] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [history, setHistory] = useState([]);
    const [currSong, setCurrSong] = useState();
    const [likedSongs, setLikedSongs] = useState([]);

    const nextSong = () => {

    }

    const prevSong = () => {

    }

    const play = () => {
        
    }

    const seek = () => {

    }

    const setLike = () => {

    }

    const addToPlaylist = () => {

    }

    const removeFromPlaylist = () => {

    }

    const playNow = () => {

    }
    
    return (
        <PlayerContext.Provider>
            {children}
        </PlayerContext.Provider>
    );
}