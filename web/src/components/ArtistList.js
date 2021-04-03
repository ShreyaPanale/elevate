import React from 'react';
import { useHistory } from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import { Avatar, Grid} from '@material-ui/core';
import ROUTES from '../routes';
import { usePlayer } from '../webplayer/provider';

const useStyles = makeStyles(()=>({
    hover:{
        '&:hover':{
            cursor:'pointer',
            boxShadow: "0px 4px 8px #EF757D",
        },
    }
}))
const ArtistList = () => {
    const classes = useStyles();
    const history = useHistory();
    const { getArtists } = usePlayer();
    const artistList = getArtists()
    console.log(artistList);
    return (
        <Grid container direction="row" spacing={10} style={{padding:20}}>
            {
                artistList.map(artist => 
                    <Grid item direction="column" justify="center" align="center">
                        <Grid item onClick={()=>{
                            history.push(ROUTES.genArtist(artist.aid))
                        }}>
                            <Avatar 
                                className={classes.hover}
                                style={{
                                    width:200,
                                    height:200,
                                    borderRadius:100,
                                }} 
                                src={artist.artistProfile}
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