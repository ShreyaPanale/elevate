import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    Grid,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import coverImage from '../assets/digitalart.png';

const useStyles = makeStyles(() => ({
    container: {
      display:"flex",
      padding:"4%",
      paddingRight:"0%",
      paddingTop:"0.5%",
      height:"100%"
    },
    nav: {
        display:'flex',
        width:"100%",
    },
    navText: {
        fontWeight:'bold',
        fontSize:42,
        '&:hover':{
            cursor:'pointer'
        }
    },
  }));
  
const AuthLayout = ({children}) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Grid container direction="column" className = {classes.container}>
            <Grid item className = {classes.nav} >
                <h1 className = {classes.navText} onClick={()=>{history.push('/')}}>elevate.</h1>
            </Grid>
            <Grid item container direction="row" >
                    <Grid item container xs={7} direction="column" style={{padding:"2%"}}>
                        
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