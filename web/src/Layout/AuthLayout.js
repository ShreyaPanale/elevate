import React from 'react';

import {
    Grid,
    Button
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import coverImage from '../assets/digitalart.png';

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
  
const AuthLayout = ({children}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" className = {classes.container}>
            <Grid item className = {classes.nav}>
                <h1 className = {classes.navText}>elevate.</h1>
            </Grid>
            <Grid item container direction="row" >
                <Grid item container xs={7} direction="column" style={{padding:"2%", height:'100%'}}>
                    {children}
                </Grid> 
                
                <Grid item container xs={5}>
                    <img src={coverImage} height="90%" width="90%" />
                </Grid>
            </Grid>
        </Grid>  
    );
}

export default AuthLayout;