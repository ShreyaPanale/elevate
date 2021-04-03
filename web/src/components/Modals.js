import React from 'react'
import { Modal, Typography, Grid,Button, FormControlLabel,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormLabel, FormControl, FormGroup,Checkbox} from '@material-ui/core';
import { usePlayer } from '../webplayer/provider'; 

const modalStyles = makeStyles((theme)=>({
    root:{
        
        background: "#FFF",
        borderRadius: 20,
        display: "flex",
        flexDirection:"column",
        outline:'none',
        padding:20,
        alignItems:'center',
        justifyContent:'center',
    },
    modal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontFamily:"Poppins",
        fontWeight:500,
        fontSize:24
    },
    header:{
        display:'flex',
        flexDirection:'row',
        width:"100%",
        padding:'3%',
        paddingLeft:'5%',
    },
    content:{
        height:520,
        width:"100%",
        borderRadius:10,
        overflowY:"auto",
        display:'flex',
        fontFamily:"Poppins"
    },
    btn:{
        backgroundColor: "#EF757D",
        padding:"4%",
        paddingTop:"1%",
        paddingBottom:"1%",
        borderRadius:10,
        textTransform:"none",
        fontSize:18,
        color:"#FFF",
        fontWeight:400,
        fontFamily:"Poppins",
        marginTop:40,
        marginBottom:8,
        width:"70%"
    },
    formControl:{
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3)
    },
    formControlLabel:{
        fontFamily:"Poppins",
        fontSize:20
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
            borderColor:'#EF757D'
        },
    },
    notchedOutline:{
        border:'none'
    },
}))

export const AddTrack = ({open,handleClose,tid}) => {
    const classes = modalStyles();
    const { addTrack, playlists } = usePlayer();
    const handleAddTrack = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        //add necessary endpoint calls
        plist.map(pid => addTrack(tid,pid))
    }
    const [plist,setPlist] = React.useState([])
    const handleChange = (event) => {
        //doesn't work
        
        let temp=plist
        if (event.target.checked)
            temp.push(parseInt(event.target.value))
        else
            temp.splice(temp.indexOf(event.target.name),1)
        setPlist(temp)
        console.log("plist",plist)
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.root} style={{height:"60%",width: '35%',}}>
                <div className={classes.header}>
                    <Typography className={classes.text}>
                        Choose your playlist
                    </Typography>
                </div>
                <div className={classes.content}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                            {
                                playlists.map((playlist) => (
                                    <FormControlLabel 
                                    control={<Checkbox value={playlist.pid} onChange={handleChange} style ={{color: "#EF757D"}}/>}
                                     label={<Typography className={classes.formControlLabel}>{playlist.pname}</Typography>}
                                     />
                                ))
                            }
                        </FormGroup>
                    </FormControl>
                </div>
                <Button className={classes.btn} onClick={handleAddTrack}>Add to Playlist</Button>
            </div>
        </Modal>
    )
}

export const CreatePlaylist = ({open,handleClose}) => {
    const classes = modalStyles();
    const { addPlaylist, playlists } = usePlayer();
    const [pname,setName] = React.useState('')
    const handleSubmit =async () =>{
        //will do
        await addPlaylist({
            pid: playlists.length+1,
            pname,
            tracks:[]
        })
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.root} style={{width: '40%',}}>
                <div className={classes.header}>
                    <Typography className={classes.text}>
                        Create playlist
                    </Typography>
                </div>
                
                <TextField variant="outlined" placeholder="Playlist Name" className={classes.input} InputProps={{classes:{notchedOutline:classes.notchedOutline}}} onChange={(e)=>{setName(e.target.value)}}/>
                
                <Button className={classes.btn} onClick={handleSubmit}>Create Playlist</Button>
            </div>
        </Modal>
    )
}
