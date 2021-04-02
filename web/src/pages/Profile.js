import React from 'react'
import { useAuth } from "../firebase/provider";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
        fontFamily:"Poppins",
        marginTop:40,
        marginLeft:300,
        marginRight:300
    }
}));

const Profile = () => {
    const classes = useStyles();
    const history = useHistory();
    const { logout,currentUser } = useAuth();
    var nameMatch = currentUser.email.match(/[^@]*/);
    
    async function handleLogout() {
        try {
          await logout()
          history.push("/signin")
        } catch {
        }
      }
    return (
        <div style={{display:"flex",flexDirection:"column",flexGrow:1,marginTop:"7%",paddingLeft:"10%",paddingRight:"10%"}}>
            <h1>Profile</h1>
            <Grid item container direction="column" style={{fontFamily:"Poppins",fontWeight:400,color:"#ABABAB"}}>
            <Grid container>
                <Grid item xs={6}> 
                <h2>UserName</h2>
                </Grid>
                <Grid item xs={6} style = {{textAlign: 'right'}}>
                <h2>{nameMatch}</h2>
                </Grid>
            </Grid>
            <Divider/>
            <Grid container>
                <Grid item xs={6}> 
                <h2>Email</h2>
                </Grid>
                <Grid item xs={6} style = {{textAlign:"right"}}>
                <h2>{currentUser.email}</h2>
                </Grid>
            </Grid>
            <Divider/>
            <Button className= {classes.btn} variant="link" onClick={handleLogout}>
                Log Out
            </Button>
            </Grid>
        </div>
    )
}

export default Profile;