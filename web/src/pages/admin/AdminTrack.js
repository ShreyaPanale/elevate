import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    Grid,
    TextField,
    Select,
    InputBase,
    MenuItem,
    Button,
} from '@material-ui/core';
import API from "../../api"
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
        fontSize:38,
        '&:hover':{
            cursor:'pointer'
        }
    },
    inputContainer:{
        display:"flex",
        width:"100%"
    },
    input:{
        marginTop:"3%",
        '& input':{
            paddingLeft:"5%",
            borderBottom:"4px solid black",
            fontFamily:"Poppins",
            fontWeight:500,
            fontSize:18
        },
        '& input:focus':{
         
        },    
    },
    inputBox:{
        marginTop:"3%",
        '& textarea':{
            border:"4px solid black",
            borderRadius:20,
            padding:"5%",
            fontFamily:"Poppins",
            fontWeight:500,
            fontSize:18,
        },
        '& input:focus':{
         
        },    
    },
    notchedOutline:{
        border:'none',
    },
    text:{
        marginTop:'5%',
        fontSize:18,
        color:"#ABABAB",
        fontWeight:400,
        fontFamily:"Poppins",
        width:"100%",
        marginRight:'10%'
    },
    hr:{
        height:'3px',
        backgroundColor:'black',
        marginRight:"10%"
    },
    tag:{
        backgroundColor: "#342D71",
        padding:"10%",
        paddingLeft:"80%",
        paddingRight:"80%",
        marginLeft:"135%",
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        fontSize:18,
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
        marginTop:20,
        marginBottom:8,
        width:300,
        alignSelf:"center"
    },
    placeholder: {
        color:"#ABABAB"
    }
  }));
  const BootstrapInput = withStyles((theme) => ({
    input: {
      marginTop:'3%',
      position:'relative',
      paddingLeft:"5%",
      borderBottom:"4px solid black",
      fontSize: 18,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily:"Poppins",
      '&:focus': {
        borderColor: '#80bdff',
      },
    },
  }))(InputBase);
const AdminPanel = ({children}) => {
    const [artists,setArtists] = React.useState([])
    React.useEffect(()=>{
            API.getArtists().then(data=>{
                setArtists(data.data);
            })
    },[])
    const classes = useStyles();
    const history = useHistory();
    const [tname,setTname] = React.useState('')
    const [genre,setGenre] = React.useState('')
    const [desc,setDesc] = React.useState('')
    const [artist, setArtist] = React.useState(0);
    const [aname,setAname] = React.useState('');
    const [selectedFile,setSelectedFile] = React.useState(null);
    const [selectedFileName,setSelectedFileName] = React.useState('Track Cover Image');
    const [selectedTrack,setSelectedTrack] = React.useState(null);
    const [selectedTrackName,setSelectedTrackName] = React.useState('Track mp3 File');
    const [prevImg,setPrevImg] = React.useState('https://customercare.igloosoftware.com/.api2/api/v1/communities/10068556/previews/thumbnails/4fc20722-5368-e911-80d5-b82a72db46f2?width=680&height=680&crop=False');
    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append("tname",tname)
        formData.append("artist",artist)
        formData.append("aname",aname)
        formData.append("genre",genre)
        formData.append("desc",desc)
        formData.append("mp3file",selectedTrack)
        formData.append("cover",selectedFile)
        
        API.createTrack(formData).then(res =>{
            setArtist('')
            setAname('')
            setTname('')
            setDesc('')
            setGenre('')
            setSelectedFileName('Track Cover Image')
            setSelectedTrackName('Track mp3 File')
            setSelectedFile(null)
            setSelectedTrack(null)
            setPrevImg('https://customercare.igloosoftware.com/.api2/api/v1/communities/10068556/previews/thumbnails/4fc20722-5368-e911-80d5-b82a72db46f2?width=680&height=680&crop=False')
        })
    }
    const handleChange = (event) => {
    setArtist(event.target.value);
    setAname(artists.filter(artist => artist.aid==event.target.value)[0].aname)
    console.log(aname)
  };
    const handleImageUpload = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = async function(e) {
            setSelectedFile(file);
            setPrevImg([reader.result])
            setSelectedFileName(file.name)
        }
        console.log(url);
    }
    const handleTrackUpload = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = async function(e) {
            setSelectedTrack(file);
            setSelectedTrackName(file.name)
        }
        console.log(url);
    }
    return (
        <Grid container direction="column" className = {classes.container}>
            <Grid item className = {classes.nav} >
                <h1 className = {classes.navText}>Upload Track</h1>
            </Grid>
            <Grid item container direction="row" >
                <Grid item container xs={6} direction="column" style={{paddingRight:"5%"}} className={classes.inputContainer}>
                        <TextField  placeholder="Track Name" className={classes.input} onChange={e=>setTname(e.target.value)} value={tname} />
                        <Select
                        value={artist}
                        onChange={handleChange}
                        input={<BootstrapInput/>}
                        IconComponent={ChevronDown}
                        >
                            <MenuItem value={0} disabled>
                                    <span className={classes.placeholder}>Artist</span>
                            </MenuItem>
                            {artists.map((value) => (
                                (value === 0)?
                                <MenuItem value={value} disabled>
                                    <span className={classes.placeholder}>Artist</span>
                                </MenuItem>:
                                <MenuItem value={value.aid}>
                                    {value.aname}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField  placeholder="Genre" className={classes.input} onChange={e=>setGenre(e.target.value)} value={genre}/>
                        <TextField  
                            variant="outlined" 
                            placeholder="Description" 
                            className={classes.inputBox}  
                            InputProps={{classes:{notchedOutline:classes.notchedOutline}}} 
                            multiline
                            rows={3}
                            value={desc}
                            onChange={e=>setDesc(e.target.value)}
                        />
                        <Button className={classes.btn} onClick={handleSubmit}>Upload Track</Button> 
                    </Grid>
                <Grid item container xs={6} className={classes.inputContainer}>
                    <label htmlFor="img" style={{width:"100%",paddingTop:'3%'}}>
                            <span className={classes.text}>
                                <text style={{width:'80%',float:'left'}}>{selectedFileName}</text>
                                <Camera style={{width:"10%",}}/>
                            </span>
                            <div className={classes.hr}></div>
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
                        src={prevImg}
                    />
                    </Grid>
                <Grid item container xs={2} style={{justifyContent:"center",alignItems:"center"}}>
                        <div className={classes.tag}>
                            Preview
                        </div>  
                    </Grid>
                    <label htmlFor="track" style={{width:"100%",padding:'3%'}}>
                <span className={classes.text}><text style={{width:'80%',float:'left'}}>{selectedTrackName}</text><Upload style={{width:"10%"}}/></span>
                <div className={classes.hr}></div>
                <input
                    style={{visibility:"hidden"}}
                    type="file"
                    id="track"
                    onChange={handleTrackUpload}
                    />    
                </label>
                 
                </Grid>               
            </Grid> 
        </Grid>  
    );
}

export default AdminPanel;