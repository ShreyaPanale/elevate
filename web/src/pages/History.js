import React from 'react'
import TopBar from '../components/TopBar';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'



import SongList from '../components/SongList';

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,   
    },
}))

const History = () => {
    const classes = useStyles();
    return (
        <Grid container direction="row">
            <Grid item container xs={12} >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            <Grid item container direction="row" className={classes.root}>
                    <Grid item>
                        <h1>
                        ⏱️ Play History
                        </h1>
                    </Grid>
                    <Grid item xs={12} style={{width:"100%"}}>
                        <SongList />
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default History
