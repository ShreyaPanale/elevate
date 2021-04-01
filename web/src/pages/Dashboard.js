import React from 'react'
import TopBar from '../components/TopBar';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        overflowY:'auto',
        paddingTop:'2%',
        paddingBottom:'1%'
    }
}))

const Dashboard = () => {
    const classes = useStyles();
    return (
        <div style={{display:"flex",flexDirection:"column",flexGrow:1,}}>
            <TopBar placeholder = {"Search for songs or artists"} />
            <Grid container className={classes.root}>
                <Grid item container>
                    <h2 className={classes.sectionTitle}>
                        Recommended Songs
                    </h2>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;