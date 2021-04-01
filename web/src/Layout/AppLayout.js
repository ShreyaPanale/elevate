import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    Grid,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from '../components/Sidebar';
 
const useStyles = makeStyles(() => ({
    container: {
        height: "100%",
        overflowY: "auto",
        display:"flex",
        flex:1,
        backgroundColor:"#FEFEFE"
      },
      fullHeight:{
        height:"100vh",
        overflow: "hidden"
      }
  }));
  
const AppLayout = ({children}) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.fullHeight}>
            <Grid item xs = {2}>
                <Sidebar />
            </Grid>
            
            <Grid
                item
                xs = {10}
                className={classes.container}>
                {children}
            </Grid>
        </Grid> 
    );
}

export default AppLayout;