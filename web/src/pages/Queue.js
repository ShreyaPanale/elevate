import React from 'react'

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';
import SongList from '../components/SongList';

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,   
    },
    horizontal:{
        overflowX:'auto',
        flexDirection:"row",
        display:'inline-flex',
        paddingBottom:"2%",
        "&::-webkit-scrollbar": {
            display: "none",
            width:'0px !important'
        },
        paddingLeft:20
    }
}))

const Queue = () => {
    const history = useHistory();
    const classes = useStyles();
    const goBack = () => {
        history.goBack()
      }
    return (
        <div style = {{display:"flex",flexDirection:'column', maxWidth:'100%'}} direction="row">
            <Grid item container direction="row" className={classes.root}>
                <Grid container>
                <Grid item xs={6}> 
                        <h2 style = {{color:"#EF757D"}}>Next Up</h2>
                </Grid>
                <Grid item xs={6} style = {{textAlign: 'right'}}> 
                        <Button onClick={goBack}><h2  style = {{color:"#EF757D"}}>Close</h2></Button>
                    </Grid>
                    <Grid item className={classes.horizontal}>
                        <SongList />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Queue;