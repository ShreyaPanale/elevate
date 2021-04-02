import React from 'react'
import { Modal, Typography, Grid,Button, FormControlLabel,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormLabel, FormControl, FormGroup,Checkbox} from '@material-ui/core';

let playlists=[
    {
        pid:1,
        pname:"Pop Rock"
    },
    {
        pid:2,
        pname:"Pop Rock"
    },
    {
        pid:3,
        pname:"Pop Rock"
    },
    {
        pid:4,
        pname:"Pop Rock"
    },
    {
        pid:5,
        pname:"Pop Rock"
    },
    {
        pid:6,
        pname:"Pop Rock"
    }
]

const modalStyles = makeStyles((theme)=>({
    root:{
        width: '40%',
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
        display:'flex'
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
    input:{
        marginTop:"4%",
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
}}))

export const AddTrack = ({open,handleClose}) => {
    const classes = modalStyles();
    const handleAddTrack = () => {
        //add necessary endpoint calls

    }
    const [plist,setPlist] = React.useState([])
    const handleChange = (event) => {
        //doesn't work
        console.log("im here")
        console.log("plist",plist);
        let temp=plist
        temp.push(event.target.name)
        setPlist(temp)
        console.log("plist",plist)
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.root} style={{height:"60%"}}>
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
                                    <FormControlLabel control={<Checkbox name={playlist.pid} onChange={handleChange}/>}
                                     label={playlist.pname}
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
    const handleSubmit = () =>{
        //will do
    }
    const [pname,setName] = React.useState('')
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography className={classes.text}>
                        Create playlist
                    </Typography>
                </div>
                
                <TextField variant="outlined" placeholder="Playlist Name" className={classes.input}  onChange={(e)=>{setName(e.target.value)}}/>
                
                <Button className={classes.btn} onClick={handleSubmit}>Create Playlist</Button>
            </div>
        </Modal>
    )
}
