import React from 'react'
import AuthLayout from '../../Layout/AuthLayout';

import {
    Grid,
    TextField,
    Button,
    Avatar,
    Typography
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(()=>({
    container : {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    heading: {
        fontSize:32,
        color: "#EF757D",
        textDecoration: 'underline',
        paddingRight:20,
        marginBottom:30
    },
    inputContainer:{
        width:"60%"
    },
    input:{
        marginTop:"4%",
        '& input':{
            paddingLeft:"5%",
            borderRadius:20,
            border:"4px solid black",
            fontFamily:"Poppins",
            fontWeight:700,
            fontSize:20
        },
        '& input:focus':{
            borderColor:'#EF757D'
        },
        
    },
    notchedOutline:{
        border:'none'
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
        fontFamily:"Poppins",
        marginTop:40,
        marginBottom:8
    }
}));

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

const Signin = () => {
    const classes = useStyles();
    return (
        <AuthLayout>
            <Grid item container className={classes.container} direction="column">
                <Grid item> 
                    <h1 className={classes.heading}>
                        Sign in
                    </h1>
                </Grid>
                <Grid item container direction="column" className={classes.inputContainer}> 
                    <TextField variant="outlined" placeholder="email" className={classes.input} InputProps={{classes:{notchedOutline:classes.notchedOutline}}} />
                    <TextField variant="outlined" type="password" placeholder="password" className={classes.input} InputProps={{classes:{notchedOutline:classes.notchedOutline}}} />
                </Grid>
                <Button className = {classes.btn}>
                    Sign in
                </Button>
                <span>
                    or
                </span>
                <GoogleButton 
                    logo="https://skipway.com/wp-content/uploads/2020/05/image-20150902-6700-t2axrz.jpg" 
                    content="Sign in with Google"
                    handleClick={()=>{}}
                />
                <span style={{fontFamily:"Poppins",fontWeight:400,color:"#ABABAB"}}>
                    Don’t have an account yet? <a href = "/signup" style={{color:"#EF757D",textDecoration:"underline"}}>Sign up</a> now.
                </span>
            </Grid>
        </AuthLayout>
    )
}

export default Signin;