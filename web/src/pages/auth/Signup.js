import React,{useState} from 'react'
import AuthLayout from '../../Layout/AuthLayout';
import { useAuth } from "../../firebase/provider"
import {
    Grid,
    TextField,
    Button,
    Fade
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import GoogleButton from "../../components/GoogleButton";

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

const Signup = () => {
    const classes = useStyles();
    const { signup, googleSignin, errors } = useAuth();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    return (
        <AuthLayout>
            <Fade
                in={true}
                timeout={1500}
                direction="up"
                ><div>
            <Grid item container className={classes.container} direction="column">
                <Grid item> 
                    <h1 className={classes.heading}>
                        Sign up
                    </h1>
                </Grid>
                <Grid item container direction="column" className={classes.inputContainer}> 
                    <TextField variant="outlined" placeholder="email" className={classes.input} InputProps={{classes:{notchedOutline:classes.notchedOutline}}} onChange={(e)=>{setEmail(e.target.value)}} />
                    <TextField variant="outlined" type="password" placeholder="password" className={classes.input} InputProps={{classes:{notchedOutline:classes.notchedOutline}}} onChange={(e)=>{setPassword(e.target.value)}}  />
                </Grid>
                <span style={{fontFamily:"Poppins",fontWeight:400,color:"#EF757D", marginTop:8}}>
                    {errors}
                </span>
                <Button className = {classes.btn} onClick = {() => {
                    if (email!='' && password!=''){
                        signup(email,password);
                    }
                }}>
                    Sign up
                </Button>
                <span>
                    or
                </span>
                <GoogleButton 
                    logo="https://skipway.com/wp-content/uploads/2020/05/image-20150902-6700-t2axrz.jpg" 
                    content="Sign up with Google"
                    handleClick={googleSignin}
                />
                <span style={{fontFamily:"Poppins",fontWeight:400,color:"#ABABAB"}}>
                    Already have an account? <a href = "/signin" style={{color:"#EF757D",textDecoration:"underline"}}>Sign in</a> now.
                </span>
            </Grid></div></Fade>
        </AuthLayout>
    )
}

export default Signup;