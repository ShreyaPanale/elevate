import React,{useContext,useEffect, useState} from 'react';
import {useAuth} from '../firebase/provider';
import DATA from './data';

export const PlayerContext = React.createContext();

export const usePlayer = () => {
    return useContext(PlayerContext);
}

export const PlayerProvider = ({children}) => {
    // const { currentUser } = useAuth();
    const { userData, tracks } = DATA;

    const [play, setPlay] = useState(false);
    const [queue, setQueue] = useState([]);
    const [playlists, setPlaylists] = useState(userData.playlists);
    const [history, setHistory] = useState(userData.history);
    const [currSong, setCurrSong] = useState();
    const [currIndex, setCurrIndex] = useState(0);
    const [likedSongs, setLikedSongs] = useState(userData.likedSongs);

    const nextSong = () => {
        if (queue.length == currIndex) return;
        setCurrIndex(currIndex+1);
    }

    const prevSong = () => {
        if (currIndex == 1) return;
        setCurrIndex(currIndex-1);
    }

    const seek = () => {

    }

    const setLike = (tid) => {
        
    }

    const getSongsForPlaylist = (playlist) => {
        let t =  tracks.filter(track => track.tid in playlist.tracks)
        console.log(t)
        return t
    }

    const getFavouritesForUser = () => {
        return new Promise((res,rej) => {
            try{
                let t = tracks.filter(track => likedSongs.includes(track.tid))
                res(t)
            }catch(err){
                rej(err)
            }
        })
    }

    const getHistoryForUser = () => {
        return new Promise((res,rej) => {
            try{
                let t = tracks.filter(track => history.includes(track.tid))
                res(t)
            }catch(err){
                rej(err)
            }
        })
    }

    const getTopSongs = () => {
        return new Promise((res,rej) => {
            try{
                let t = tracks.sort((a,b) => a.plays<b.plays?1:-1)
                res(t)
            }catch(err){
                rej(err)
            }
        })
    }

    const addPlaylist = (playlistId) => {
        playlists.push(playlistId)
    }

    const playNow = (trackId) => {
        queue.splice(currIndex-1,0,trackId);
        setCurrSong(trackId);
    }

    return (
        <PlayerContext.Provider
            value = {{
                nextSong,
                prevSong,
                play,
                setPlay,
                seek,
                setLike,
                addPlaylist,
                playNow,
                queue,
                setQueue,
                playlists, 
                setPlaylists,
                history,
                setHistory,
                currSong, 
                setCurrSong,
                likedSongs, 
                setLikedSongs,
                currIndex, 
                setCurrIndex,
                getSongsForPlaylist,
                getFavouritesForUser,
                getHistoryForUser,
                getTopSongs
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}