import React from 'react'
import TopBar from '../components/TopBar';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongList from '../components/SongList';
import SongCard from '../components/SongCard';

import {usePlayer} from '../webplayer';
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
        width:'100%',
        "&::-webkit-scrollbar": {
            display: "none",
            width:'0px !important'
        },
        paddingLeft:20
    }
}))


const Dashboard = () => {
    const classes = useStyles();
    const { userRecommendations, popularityRecommendations } = usePlayer();
    return (
        <div style = {{display:"flex",flexDirection:'column', maxWidth:'100%'}} direction="row">
            <Grid item container >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            
            <Grid item container direction="row" className={classes.root}>
                <Grid item container direction="column">
                    <Grid item>
                        <h2 className={classes.sectionTitle}>
                            Recommended Songs
                        </h2>
                    </Grid>
                    <Grid item className={classes.horizontal}>
                        {
                            userRecommendations.map((song,idx) =><SongCard key={idx} song={song} />)
                        }
                    </Grid>
                </Grid>

                <Grid item container direction="column">
                    <Grid item>
                        <h2 className={classes.sectionTitle}>
                            Top Songs
                        </h2>
                    </Grid>
                    <Grid item className={classes.horizontal}>
                        <SongList tracks={popularityRecommendations}/>
                    </Grid>
                </Grid>
            </Grid>
            
            
            
        </div>
    )
}

export default Dashboard;