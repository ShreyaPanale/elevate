import React,{useState,useEffect} from 'react'
import TopBar from '../../components/TopBar';

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { usePlayer } from '../../webplayer';
import { useParams } from 'react-router-dom';
import SongList from '../../components/SongList';

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,   
        height:'100%'
    },
    btn:{
        backgroundColor: "#EF757D",
        padding:30,
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
}))

const Playlist = () => {
    const {id} = useParams();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const { playlists, getSongsForPlaylist } = usePlayer();
    console.log(playlists)
    const playlist = playlists.filter(playlist => playlist.pid == id)[0];
    const [ songs, setSongs ] = useState([]);
    useEffect(() => {
        setLoading(true);
        console.log("playlist",playlist)
        getSongsForPlaylist(id).then(res => {
            setSongs(res)
            setLoading(false);
        });
    }, [id,playlists])
    return (
        <Grid container direction="row">
            <Grid item container xs={12} >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            <Grid item container direction="row" className={classes.root}>
                    <Grid item xs={12} container direction="row">
                        <Grid item xs={11}>
                            <h1>
                            🎧 {playlist.pname}
                            </h1>
                        </Grid>
                        <Grid item xs={1} justify='center'>
                                <Button className = {classes.btn}>
                                    Play
                                </Button>
                            </Grid>
                    </Grid>
                    <Grid item xs={12} style={{width:"100%", height:'100%'}} >
                        {
                            loading? <p>Loading...</p>:<SongList tracks={songs} />
                        }
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default Playlist
