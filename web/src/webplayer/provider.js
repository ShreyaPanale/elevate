import React,{useContext,useEffect, useState} from 'react';

export const PlayerContext = React.createContext();

export const usePlayer = () => {
    return useContext(PlayerContext);
}

export const PlayerProvider = ({children}) => {

    const [queue, setQueue] = useState([]);
    const [currSong, setCurrSong] = useState();

    const nextSong = () => {

    }

    const prevSong = () => {

    }

    const play = () => {
        
    }

    return (
        <PlayerContext.Provider>
            {children}
        </PlayerContext.Provider>
    );
}