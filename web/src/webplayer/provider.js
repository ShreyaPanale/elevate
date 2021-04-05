import React,{useContext,useEffect, useState} from 'react';
import {useAuth} from '../firebase/provider';
import DATA from './data';

import {AddTrack,CreatePlaylist} from '../components/Modals';
export const PlayerContext = React.createContext();

export const usePlayer = () => {
    return useContext(PlayerContext);
}

export const PlayerProvider = ({children}) => {
    // const { currentUser } = useAuth();
    const { userData, tracks } = DATA;

    const [play, setPlay] = useState(false);
    const [songQueue, setSongQueue] = useState([
    ]);
    
    const [playlists, setPlaylists] = useState(userData.playlists);
    const [history, setHistory] = useState(userData.history);
    const [currSong, setCurrSong] = useState();
    const [currIndex, setCurrIndex] = useState(-1);
    const [likedSongs, setLikedSongs] = useState(userData.likedSongs);

    const [modal, setModal] = React.useState(0);
    const [tid, setTid] = React.useState();
    const handleClose = () => setModal(0);
    
    const [audio,setAudio] = useState(new Audio());
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio && audio.play() : audio && audio.pause();
      },
      [playing]
    );
      
    useEffect(()=>{
        if ( songQueue.length>0 && currIndex != -1 && songQueue[currIndex]){
            audio.setAttribute('src', songQueue[currIndex].link)
            setAudio(audio);
        }
    },[currIndex])

    useEffect(() => {
    if (audio){
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }
    }, [audio]);
    
    const handleAddTrack = (tid) => {
        setTid(tid)
        setModal(1)
    }
    const handleCreatePlaylist = (event) => {
        setModal(2)
    }

    const nextSong = () => {
        if (songQueue.length-1 === currIndex) return;
        setCurrIndex(currIndex+1);
    }

    const prevSong = () => {
        if (currIndex == 0) return;
        setCurrIndex(currIndex-1);
    }

    const seek = () => {

    }

    const setLike = (tid,action) => {
        if(action==1){
            likedSongs.push(tid);
            
        }else{
            likedSongs.splice(likedSongs.indexOf(tid),1);
        }
        let newLikedSongs = [...likedSongs]
        setLikedSongs(newLikedSongs)
    }

    const getSongsForPlaylist = (playlist) => {
        let t =  tracks.filter(track => playlist.tracks.includes(track.tid))
        return t
    }

    const getFavouritesForUser = () => {
        return tracks.filter(track => likedSongs.includes(track.tid))
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

    const addPlaylist = (playlist) => {
        playlists.push(playlist);
        let newPlaylists = playlists;
        setPlaylists(newPlaylists);
    }

    const addTrack = (tid, pid) => {
        
        let ps = playlists.map(playlist => {
            if(playlist.pid == pid){
                playlist.tracks.push(tid);
            }
            return playlist
        })
        setPlaylists(ps);
    }

    const playNow = (track) => {
        songQueue.splice(currIndex-1,0,track);
        setSongQueue([...songQueue]);
        setCurrSong(track);
    }

    const addToQueue = (track) => {
        songQueue.push(track);
        if (currIndex === -1){
            setCurrIndex(0);
        }
        setSongQueue([...songQueue])
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
                playNow,
                songQueue,
                addToQueue,
                setSongQueue,
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
                getTopSongs,
                addPlaylist,
                addTrack,
                handleAddTrack,
                handleCreatePlaylist,
                audio,
                setAudio,
                playing,
                setPlaying,
                toggle
            }}
        >
            {children}
            <AddTrack handleClose={handleClose} open={modal===1} tid={tid} />
            <CreatePlaylist handleClose={handleClose} open={modal===2} />
        </PlayerContext.Provider>
    );
}