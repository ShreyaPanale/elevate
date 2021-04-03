import React from 'react'
import TopBar from '../../components/TopBar';

import { Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { usePlayer } from '../../webplayer/provider';
import { useParams } from 'react-router-dom';

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
    const { getTracks } = usePlayer();
    const trackList = getTracks()
    const { getArtists } = usePlayer();
    const artistList = getArtists()
    const artist = artistList.filter(artist => artist.aid == id)[0];
    console.log(artist);
    return (
        <Grid container direction="row">
            <Grid item xs={12} >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            <div className={classes.root}>
                    <div style={{display:"inline-flex",alignSelf:'start'}}>
                        <h1 style={{
                            alignItems:'center',
                            display:'flex',
                            justifyContent:'center'
                        }}>
                        <Avatar
                                style={{
                                    width:60,
                                    height:60,
                                    borderRadius:100,
                                    display:'inline-flex',
                                    marginRight:20
                                }} 
                                src={artist.artistProfile}
                            /> {artist.aname}
                        </h1>
                    </div>
                    <div item xs={12} style={{}}>
                        <ArtistSongList tracks={trackList}/>
                    </div>
            </div>
        </Grid>
    )
}

export default Artist
