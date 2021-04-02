import React from 'react'

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongList from '../components/SongList';

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,   
    }
}))

const Favourites = () => {
    const classes = useStyles();
    return (
        <div style = {{display:"flex",flexDirection:'column', maxWidth:'100%'}} direction="row">
        
        <Grid item container direction="row" className={classes.root}>
                <Grid item>
                    <h2 className={classes.sectionTitle}>
                        Favourites
                    </h2>
                </Grid>
                <Grid item className={classes.horizontal}>
                    <SongList />
                </Grid>
        </Grid>
    </div>
    )
}

export default Favourites
