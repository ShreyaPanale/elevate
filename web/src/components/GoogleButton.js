import React from 'react'

import {
    Avatar,
    Typography
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const googleButtonStyles = makeStyles(()=>({
    buttonContainer:{
        padding:20,
        paddingTop:6,
        paddingBottom:6,
        margin:8,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:0,
        border:"1px solid rgba(0, 0, 0, 0.25)",
        "&:hover":{
            boxShadow: "0px 2px 2px #EF757D",
            cursor:"pointer"
        }
    },
    authLogo:{
        height:40,
        width:40,
        marginRight:8
    },
    buttonText:{
        fontFamily:"Poppins",
        fontWeight:100,
        fontSize:16
    }
}))

const GoogleButton = ({logo,content,handleClick}) => {
    const classes = googleButtonStyles();
    return (
        <div className={classes.buttonContainer} onClick={handleClick}>
            <Avatar src={logo} className={classes.authLogo} />
            <Typography className={classes.buttonText}>
                {content}
            </Typography>
        </div>
    );
}
export default GoogleButton;