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
    inputContainer:{
        width:"50%"
    },
    input:{
        marginTop:"3%",
        '& input':{
            paddingLeft:"5%",
            borderBottom:"2px solid black",
            fontFamily:"Poppins",
            fontWeight:500,
            fontSize:20
        },
        '& input:focus':{
         
        },    
    },
    inputBox:{
        marginTop:"3%",
        '& input':{
            paddingLeft:"5%",
            borderRadius:20,
            border:"2px solid black",
            fontFamily:"Poppins",
            fontWeight:500,
            fontSize:20,
        },
        '& input:focus':{
         
        },    
    },
    notchedOutline:{
        border:'none',
    },
    text:{
        marginTop:'5%',
        fontSize:20,
        color:"#ABABAB",
        fontWeight:400,
        fontFamily:"Poppins",
        borderBottom:"2px solid black",
        width:"100%"
    },
    label:{
        backgroundColor: "#342D71",
        padding:"10%",
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        fontSize:20,
        color:"#FFF",
        fontWeight:400,
        fontFamily:"Poppins",
    },
    previmg:{
        height:210,
        width: 210,
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
        marginTop:40,
        marginBottom:8,
        width:300,
        alignSelf:"center"
    }
  }));
  const BootstrapInput = withStyles((theme) => ({
    input: {
      marginTop:'3%',
      position:'relative',
      paddingLeft:"5%",
      borderBottom:"2px solid black",
      fontSize: 20,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily:"Poppins",
      '&:focus': {
        borderColor: '#80bdff',
      },
    },
  }))(InputBase);
const AdminPanel = ({children}) => {
    
    const classes = useStyles();
    const history = useHistory();
    const [artist, setArtist] = React.useState('');
    const [selectedFile,setSelectedFile] = React.useState('https://customercare.igloosoftware.com/.api2/api/v1/communities/10068556/previews/thumbnails/4fc20722-5368-e911-80d5-b82a72db46f2?width=680&height=680&crop=False');
    const [selectedFileName,setSelectedFileName] = React.useState('Track Cover Image');
    const [selectedTrack,setSelectedTrack] = React.useState(null);
    const [selectedTrackName,setSelectedTrackName] = React.useState('Track mp3 File');
    let data =[
        'item 1',
        'item 2',
        'item 3'
    ]
    const handleChange = (event) => {
    setArtist(event.target.value);
  };
    const handleImageUpload = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = async function(e) {
            setSelectedFile([reader.result]);
            setSelectedFileName(file.name)
        }
        console.log(url);
    }
    const handleTrackUpload = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = async function(e) {
            setSelectedTrack([reader.result]);
            setSelectedTrackName(file.name)
        }
        console.log(url);
    }
    return (
        <Grid container direction="column" className = {classes.container}>
            <Grid item className = {classes.nav} >
                <h1 className = {classes.navText} onClick={()=>{history.push('/')}}>elevate.</h1>
            </Grid>
            <Grid item container direction="row" >
                <Grid item container xs={6} direction="column" style={{paddingRight:"5%"}} className={classes.inputContainer}>
                        <TextField  placeholder="Track Name" className={classes.input}  />
                        <Select
                        value={artist}
                        onChange={handleChange}
                        input={<BootstrapInput/>}
                        IconComponent={ChevronDown}
                        >
                            {data.map((value) => (
                                <MenuItem value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField  placeholder="Artist Name" className={classes.input}  />
                        <TextField  placeholder="Genre" className={classes.input}  />
                        <TextField  variant="outlined" placeholder="Description" className={classes.inputBox}  InputProps={{classes:{notchedOutline:classes.notchedOutline}}} InputProps={{classes:{notchedOutline:classes.notchedOutline}}}/>
                    </Grid>
                <Grid item container xs={6} className={classes.inputContainer}>
                <label htmlFor="img" style={{width:"100%",padding:'3%'}}>
                <span className={classes.text}><text style={{width:'90%'}}>{selectedFileName}</text><Camera style={{width:"10%"}}/></span>
                <input
                    style={{visibility:"hidden"}}
                    type="file"
                    id="img"
                    onChange={handleImageUpload}
                    />    
                </label>
                    <Grid item container xs={4}>
                    <img
                        className={classes.previmg}
                        src={selectedFile}
                    />
                    </Grid>
                    <Grid item container xs={2} style={{justifyContent:"center",alignItems:"center"}}>
                        <div className={classes.label}>
                            Preview
                        </div>  
                    </Grid>
                <label htmlFor="track" style={{width:"100%",padding:'3%'}}>
                <span className={classes.text}><text style={{width:'90%'}}>{selectedTrackName}</text><Upload style={{width:"10%"}}/></span>
                <input
                    style={{visibility:"hidden"}}
                    type="file"
                    id="track"
                    onChange={handleTrackUpload}
                    />    
                </label>
                </Grid>
                
            </Grid>
            <Button className={classes.btn}>Upload Track</Button>
        </Grid>  
    );
}

export default AdminPanel;