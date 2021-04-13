import React from 'react'
import Searchbar from '../components/Searchbar';

import { useHistory } from 'react-router-dom';
import ROUTES from '../routes';

import { useAuth } from "../firebase/provider";
import { Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const topbarStyles = makeStyles(()=>({
    profile :{
        '&:hover':{
            cursor:'pointer',
            textDecoration:'underline',
        }
    }
}))

const TopBar = ({placeholder}) => {
    const { currentUser } = useAuth();
    const history = useHistory();
    const classes = topbarStyles();
    var nameMatch = currentUser.email.match(/[^@]*/);
    return (
        <Grid container direction="row" style = {{marginTop:'2%',paddingLeft:'4%',marginBottom:0,paddingBottom:0}}>
            <Grid item xs={8} style = {{paddingRight:'8%'}}>
                <Searchbar placeholder={placeholder} />
            </Grid>
            <Grid item container justify="flex-end" alignItems="center" xs={4} style={{paddingRight:'4%',margin:0 }}>
                <span
                className={classes.profile}
                onClick = {
                ()=>{
                    history.push(ROUTES.profile)
                }
            }>{nameMatch}</span>
            {
                currentUser.photoURL?<Avatar alt={nameMatch} style={{marginLeft:10}} src={currentUser.photoURL} />:null
            }
            </Grid>
        </Grid>
    );
}

export default TopBar