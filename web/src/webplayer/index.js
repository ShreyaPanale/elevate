/*
    Gotta clean this code up big time
*/

import React,{useContext,useEffect, useState} from 'react';
import DATA from './data';
import API from "../api"
import {useAuth} from '../firebase/provider'
import {AddTrack,CreatePlaylist} from '../components/Modals';

export const PlayerContext = React.createContext();
export const usePlayer = () => {
    return useContext(PlayerContext);
}

export const PlayerProvider = ({children}) => {
    const {currentUser} = useAuth()
    useEffect(()=>{
        API.getUserData(currentUser.uid).then(data =>{
            setPlaylists(data.playlists)
            setHistory(data.history)
            setLikedSongs(data.likedSongs)
          })
    },[])

    //const { userData, tracks ,artists} = useAuth();
    const {tracks } = DATA;

    const [play, setPlay] = useState(false);
    const [songQueue, setSongQueue] = useState([
    ]);
    const [likedSongs,setLikedSongs] = useState([])
    const [playlists, setPlaylists] = useState([]);
    const [history, setHistory] = useState([]);
    const [currSong, setCurrSong] = useState();
    const [currIndex, setCurrIndex] = useState(-1);
    //const [artistList,setArtistList] = useState([]);
    //const [trackList,setTrackList] = useState([]);

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

    //EP added
    const setLike = (tid,action) => {
        if(action==1){
            API.setLike({"uid":currentUser.uid,"tid":tid,"action":"like"})
            likedSongs.push(tid);
            
        }else{
            API.setLike({"uid":currentUser.uid,"tid":tid,"action":"unlike"})
            likedSongs.splice(likedSongs.indexOf(tid),1);
        }
        let newLikedSongs = [...likedSongs]
        setLikedSongs(newLikedSongs)
    }

    //EP added
    const getSongsForPlaylist = (playlist) => {
        console.log(playlist);
        return API.getPlaylistTracks(playlist).then(res => {
            return res.data.tracks
        })
    }

    //EP added
    const getFavouritesForUser = () => {
        return API.getUserFavourites(currentUser.uid).then(res =>{
            return res.data
        })
        //return tracks.filter(track => likedSongs.includes(track.tid))
    }

    //EP added
    const getHistoryForUser = () => {
        return API.getUserHistory(currentUser.uid).then(res =>{
            return res.data
        })
        /*
        return new Promise((res,rej) => {
            try{
                API.getUserFavourites(currentUser.uid).then(data =>{
                    res(data.data)
                })
                //let t = tracks.filter(track => history.includes(track.tid))
                //res(t)
            }catch(err){
                rej(err)
            }
        })
        */
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

    //EP added
    const addPlaylist = (playlist) => {
        API.createPlaylist(playlist).then(async res => {
            //console.log(res.pid)
            playlist['pid']=res.pid
            playlist['tracks']=[]
            const toAdd={
                "pid":res.pid,
                "uid":currentUser.uid,
                "action":"addPlaylist"
            }
            //console.log(toAdd)
            await API.addPlaylistToUser(toAdd)
            playlists.push(playlist);
            let newPlaylists = playlists;
            setPlaylists(newPlaylists);
            setModal(0)
        })
        
    }
    //EP added
    const addTrack = (tid, pid) => {
        let temptrack = {
            "tid" : tid,
            "pid" : pid,
            "action" : "addTrack"
        }
        API.addTrackToPlaylist(temptrack)
        let ps = playlists.map(playlist => {
            if(playlist.pid == pid){
                playlist.tracks.push(tid);
            }
            return playlist
        })
        setPlaylists(ps);
        setModal(0);
    }

    const playNow = (track) => {
        setCurrIndex(songQueue.indexOf(track));
        setCurrSong(track);
    }

    const addToQueue = (track) => {
        songQueue.push(track);
        if (currIndex === -1){
            setCurrIndex(0);
        }
        setSongQueue([...songQueue])
    }   

    //EP added
    const getArtists = () => {
        return API.getArtists().then(data => {
            console.log(data.data)
            return data.data
          })
        //return []
    }
    //EP added
    const getTracks = () => {
        return API.getTracks(currentUser.uid).then(data =>{
            return data.data
          })
    }
    //EP added
    const getTracksForArtist = (aid) => {
        return API.getTracksByArtist(aid).then(data =>{
            return data.data
          })
        //return trackList.filter(track => track.aid == aid);
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
                toggle,
                getArtists,
                getTracks,
                getTracksForArtist
            }}
        >
            {children}
            <AddTrack handleClose={handleClose} open={modal===1} tid={tid} />
            <CreatePlaylist handleClose={handleClose} open={modal===2} />
        </PlayerContext.Provider>
    );
}