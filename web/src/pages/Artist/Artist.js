import React from 'react'
import {useState,useEffect} from 'react'
import TopBar from '../../components/TopBar';

import { Button, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { usePlayer } from '../../webplayer';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import SongList from '../../components/SongList'
import ArtistSongList from '../../components/ArtistSongList'
const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,
        height:'100%',
        width:'100%'
    }
}))



const Artist = () => {
    const {id} = useParams();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const { getArtists, getTracksForArtist } = usePlayer();
    const artistList = getArtists()
    //const artist = artistList.filter(artist => artist.aid == id)[0];
    //const trackList = getTracksForArtist(id);

    const [artist,setArtist]=React.useState({})
    const [trackList,setTrackList]=React.useState([])
    useEffect(()=>{
        getArtists().then(res => {
            setArtist(res.filter(artist => artist.aid == id)[0])
        })
        getTracksForArtist(id).then(res => {
            setTrackList(res)
        })
    },[])

    const history = useHistory();
    const goBack = () => {
        history.goBack()
      }
    
    return (
        <Grid container direction="row">
            <Grid item xs={12} >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            <div className={classes.root}>
                <div style = {{display:"flex",flexDirection:'column', width:'100%'}} direction="row">
                    <Grid item container direction="row" className={classes.root}>
                        <Grid container>
                            <Grid item xs={6}> 
                                <h1 style={{
                                    alignItems:'center',
                                    display:'flex',
                                }}>
                                <Avatar style={{
                                            width:60,
                                            height:60,
                                            borderRadius:100,
                                            display:'inline-flex',
                                            marginRight:20
                                        }} 
                                        src={artist.photo}
                                />
                                {artist.aname}</h1>
                            </Grid>
                            <Grid item xs={6} style = {{textAlign: 'right'}}> 
                                <Button onClick={goBack}><h2  style = {{color:"#EF757D", textTransform:'none'}}>Close</h2></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div item xs={12} style={{}}>
                    <SongList tracks={trackList}/>
                </div>
            </div>
        </Grid>
    )
}

export default Artist
