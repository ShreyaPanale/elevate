import React, {Component} from 'react';

import {
    Grid
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import coverImage from '../assets/digitalart.png';
import waveform from '../assets/waveform.svg'
const useStyles = makeStyles(() => ({
    container: {
      display:"flex",
      flex:1,
      padding:"4%",
      paddingRight:"0%",
      paddingTop:"0.5%"
    },
    nav: {
        display:'flex',
        width:"100%"
    },
    navText: {
        fontWeight:'bold',
        fontSize:42
    },
  }));
  
const Landing = () => {
    const classes = useStyles();
    return (
        <Grid container direction="column" className = {classes.container}>
            <Grid item className = {classes.nav}>
                <h1 className = {classes.navText}>elevate.</h1>
            </Grid>
            <Grid item container direction="row" >
                <Grid item container xs={7} direction="column">
                    <Grid item className={classes.waveform}>
                        <img src={waveform} height="90%" />
                        S
                    </Grid>
                </Grid>
                <Grid item container xs={5}>
                    <img src={coverImage} height="90%" width="90%" />
                </Grid>
            </Grid>
        </Grid>  
    );
}

export default Landing;