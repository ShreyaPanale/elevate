import React from 'react'
import TopBar from '../../components/TopBar';

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongList from '../../components/SongList';

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,   
    },
    btn:{
        backgroundColor: "#EF757D",
        padding:30,
        paddingTop:"1%",
        paddingBottom:"1%",
        borderRadius:20,
        textTransform:"none",
        fontSize:18,
        color:"#FFF",
        fontWeight:400,
        fontFamily:"Poppins",
        marginTop:40,
        marginBottom:8
    }
}))

const Playlist = () => {
    const classes = useStyles();
    return (
        <Grid container direction="row">
            <Grid item container xs={12} >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            <Grid item container direction="row" className={classes.root}>
            <Grid item container direction="row" justify="center">
                    <Grid item xs={11}>
                        <h1>
                        🎧 Playlist name
                        </h1>
                    </Grid>
                    <Grid item xs={1} justify='center'>
                            <Button className = {classes.btn}>
                                Play
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{width:"100%"}}>
                        <SongList />
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default Playlist
