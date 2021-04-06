import React from 'react';
import {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import { Avatar, Grid} from '@material-ui/core';
import ROUTES from '../routes';
import { usePlayer } from '../webplayer';

const useStyles = makeStyles(()=>({
    hover:{
        '&:hover':{
            cursor:'pointer',
            boxShadow: "0px 4px 8px #EF757D",
        },
    }
}))
const ArtistList = ({artists,size=200}) => {
    const classes = useStyles();
    const history = useHistory();
    
    //const artistList = getArtists()
    //console.log(artistList);
    return (
        <Grid container direction="row" spacing={10} style={{padding:20}}>
            {
                artists && artists.map(artist => 
                    <Grid item direction="column" justify="center" align="center">
                        <Grid item onClick={()=>{
                            history.push(ROUTES.genArtist(artist.aid))
                        }}>
                            <Avatar 
                                className={classes.hover}
                                style={{
                                    width:size,
                                    height:size,
                                    borderRadius:100,
                                }} 
                                src={artist.photo}
                            />
                        </Grid>
                        <Grid item style={{
                                fontFamily:"Poppins",
                            }}>
                                {artist.aname}
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    );
}

export default ArtistList;