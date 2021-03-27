import React, {Component} from 'react';

import {
    Grid,
    Button
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
    heading1:{
        fontWeight:'bold',
        fontSize:64,
        marginTop:20,
        marginBottom:50,
        lineHeight:"64px"
    },
    heading2:{
        fontWeight:'bold',
        fontSize:36
    },
    info:{
        fontWeight:500,
        fontSize:24,
        color:"#ABABAB",
        width:"80%"
    },
    btn:{
        backgroundColor: "#EF757D",
        padding:"4%",
        paddingTop:"1%",
        paddingBottom:"1%",
        borderRadius:20,
        textTransform:"none",
        fontSize:18,
        color:"#FFF",
        fontWeight:400,
        fontFamily:"Poppins"
    }
  }));
  
const Landing = () => {
    const classes = useStyles();
    return (
        <Grid container direction="column" className = {classes.container}>
            <Grid item className = {classes.nav}>
                <h1 className = {classes.navText}>elevate.</h1>
            </Grid>
            <Grid item container direction="row" >
                <Grid item container xs={7} direction="column" style={{padding:"2%", height:'100%'}}>
                    <Grid item>
                        <img src={waveform} height="90%" />
                    </Grid>
                    <Grid item>
                        <h1 className = {classes.heading1}>
                            Play your feel<br/>
                            <text className = {classes.heading2}>
                                Its simply <span style={{textDecoration:'line-through'}}>magic</span> <span style={{color:"#EF757D"}}>music</span>.
                            </text>
                        </h1>
                        <p className = {classes.info}>
                            Access a large set of non copyright songs directly from the artists on your web browser.
                        </p>
                    </Grid>
                    <Grid item style={{flex:1,marginTop:'auto'}}>
                        <Button className = {classes.btn}>
                            Get Started
                        </Button>
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