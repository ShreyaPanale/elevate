import React from 'react';
import {useHistory} from 'react-router-dom';
import { useAuth } from "../firebase/provider";
import {
    Grid,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from '../components/AdminSidebar';
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
        overflow: "hidden",
        paddingBottom: 100
      }
  }));
  
const AdminLayout = ({children}) => {
    const classes = useStyles();
    const history = useHistory();
    const { logout} = useAuth();
    async function handleLogout() {
        try {
          await logout()
          history.push("/signin")
        } catch {
        }
      }
    return (
        <Grid container>
        <Grid container className={classes.fullHeight}>
            <Grid item xs = {2}>
                <Sidebar handleLogout={handleLogout}/>
            </Grid>
            <Grid
                item
                xs = {10}
                className={classes.container}>
                {children}
            </Grid>
        </Grid>
        </Grid>
    );
}

export default AdminLayout;