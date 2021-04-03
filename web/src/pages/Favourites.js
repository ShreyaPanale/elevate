import React from 'react'
import TopBar from '../components/TopBar';
import { usePlayer } from "../webplayer/provider";

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongList from '../components/SongList';

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0, 
        height:'100%'
    }
}))

const Favourites = () => {
    const classes = useStyles();
    const [favourites, setFavourites] = React.useState([])
    const { getFavouritesForUser,likedSongs } = usePlayer();
    const [ loading, setLoading ] = React.useState(true);
    React.useEffect(()=>{
        getFavouritesForUser().then(favourites => {
            setFavourites(favourites)
            setLoading(false);
        });
    },[likedSongs])
    return (
        <Grid container direction="row">
            <Grid item container xs={12} >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            <Grid item container direction="row" className={classes.root}>
                    <Grid item xs={12}>
                        <h1>
                        ❤️ Favourites
                        </h1>
                    </Grid>
                    <Grid item xs={12} style={{width:"100%", height:'100%'}}>
                        {
                            loading? <p>Loading...</p>:<SongList tracks={favourites} />
                        }
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default Favourites
