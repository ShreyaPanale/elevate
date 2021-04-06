import React from 'react'
import TopBar from '../../components/TopBar';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {usePlayer} from '../../webplayer'
import ArtistList from '../../components/ArtistList';

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,
        height:'100%'
    }
}))

const Artists = () => {
    const classes = useStyles();
    const { artists } = usePlayer();
    return (
        <Grid container direction="row">
            <Grid item xs={12} >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            <div item container direction="row" className={classes.root}>
                    <div item xs={12}>
                        <h1>
                        🧑‍🎤 Artists
                        </h1>
                    </div>
                    <div item xs={12} style={{}}>
                        <ArtistList artists={artists} />
                    </div>
            </div>
        </Grid>
    )
}

export default Artists
