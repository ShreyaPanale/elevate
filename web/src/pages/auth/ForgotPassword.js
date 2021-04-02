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

const ForgotPassword = () => {
    const classes = useStyles();
    const { resetPassword, errors, setErrors } = useAuth();
    const [loading, setLoading] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ msg, setMsg] = useState("")
    async function handleSubmit(email) {
        try {
          setMsg("")
          setLoading(true)
          await resetPassword(email)
          setMsg("An email has been send to you, check it out.")
        } catch {
          setErrors("Failed to reset password")
        }
    
        setLoading(false)
      }

    return (
        <AuthLayout>
            <Fade
                in={true}
                timeout={1500}
                direction="up">
                    <div>
            <Grid item container className={classes.container} direction="column">
                <Grid item> 
                    <h1 className={classes.heading}>
                        Forgot Password
                    </h1>
                </Grid>
                <Grid item container direction="column" className={classes.inputContainer}> 
                    <TextField variant="outlined" placeholder="email" className={classes.input} InputProps={{classes:{notchedOutline:classes.notchedOutline}}} onChange={(e)=>{setEmail(e.target.value)}}/>
                </Grid>
                <span style={{fontFamily:"Poppins",fontWeight:400,color:"#EF757D", marginTop:8}}>
                    {errors}
                </span>
                <Button disabled = {loading} className = {classes.btn} onClick = {() => {
                    if (email!=''){
                        handleSubmit(email);
                    }
                }}>
                    Reset Password
                </Button>

                <span style={{fontFamily:"Poppins",fontWeight:400,color:"#ABABAB"}}>
                    Don’t have an account yet? <a href = "/signup" style={{color:"#EF757D",textDecoration:"underline"}}>Sign up</a> now.
                </span>
            </Grid>
            </div>
            </Fade>
        </AuthLayout>
    )
}

export default ForgotPassword;