import React from 'react'

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';
import SongList from '../components/SongList';
import {usePlayer} from '../webplayer/provider';

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,   
    },
}))

const Queue = () => {
    const history = useHistory();
    const classes = useStyles();
    const { songQueue } = usePlayer();
    const goBack = () => {
        history.goBack()
      }
    return (
        <div style = {{display:"flex",flexDirection:'column', width:'100%'}} direction="row">
            <Grid item container direction="row" className={classes.root}>
                <Grid container>
                <Grid item xs={6}> 
                        <h2 style = {{color:"#EF757D"}}>Next Up</h2>
                </Grid>
                <Grid item xs={6} style = {{textAlign: 'right'}}> 
                        <Button onClick={goBack}><h2  style = {{color:"#EF757D", textTransform:'none'}}>Close</h2></Button>
                    </Grid>
                    <Grid item style={{width:'100%'}}>
                        <SongList tracks={songQueue}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Queue;