import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    Grid,
    TextField,
    Select,
    InputBase,
    MenuItem,
    Button,
    Typography
} from '@material-ui/core';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import {ChevronDown,Camera,Upload} from 'react-feather'
import API from "../../api"
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
        fontSize:38,
        '&:hover':{
            cursor:'pointer'
        }
    },
    inputContainer:{
        display:"flex",
        width:"50%",
        justifyContent:"center",
        alignItems:"center"
    },
    input:{
        marginTop:"4%",
        width:"80%",
        '& input':{
            paddingLeft:"5%",
            border:"4px solid black",
            fontFamily:"Poppins",
            fontWeight:700,
            fontSize:20
        },
        '& input:focus':{
            borderColor:'#342D71'
        }, 
    },
    notchedOutline:{
        border:'none',
    },
    btn:{
        backgroundColor: "#342D71",
        padding:"3%",
        paddingTop:"1%",
        paddingBottom:"1%",
        borderRadius:20,
        textTransform:"none",
        fontSize:18,
        color:"#FFF",
        fontWeight:400,
        fontFamily:"Poppins",
        marginTop:20,
        marginBottom:8,
        width:300,
        alignSelf:"center"
    },
    placeholder: {
        color:"#ABABAB"
    }
  }));
 
const AdminPanel = ({children}) => {
    
    const classes = useStyles();
    const history = useHistory();
    const [aname,setAname]=React.useState('')
    const [photo,setPhoto]=React.useState('')
    const handleChange = (event) => {
        event.preventDefault();
        const artist ={
            "aname" : aname,
            "photo" : photo
        }
        API.createArtist(artist).then(res => {
            setAname('')
            setPhoto('')
            history.push(`/addartist`);
        })
  };
    return (
        <Grid container direction="column" className = {classes.container}>
            <Grid item className = {classes.nav} >
                <h1 className = {classes.navText}>Add New Artist</h1>
            </Grid>
            <Grid item container direction="row" >
                <Grid item container xs={12} direction="column" style={{paddingRight:"5%"}} className={classes.inputContainer}>
                        <TextField  placeholder="Artist Name" className={classes.input}  
                        InputProps={{classes:{notchedOutline:classes.notchedOutline}}} 
                        value={aname}
                        onChange={e => setAname(e.target.value)}
                        />
                        <TextField  placeholder="Artist Photo URL" className={classes.input}  
                        InputProps={{classes:{notchedOutline:classes.notchedOutline}}}
                        value={photo}
                        onChange={e => setPhoto(e.target.value)}
                        />
                        <Button className={classes.btn} onClick={handleChange}>Add Artist</Button> 
                    </Grid>
        </Grid>  
        </Grid>
    );
}

export default AdminPanel;