import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    Grid,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import {AddTrack,CreatePlaylist} from '../components/Modals';
import {PlayerProvider} from '../webplayer/provider';

const useStyles = makeStyles(() => ({
    container: {
        height: "100%",
        overflowY: "auto",
        display:"flex",
        flex:1,
        backgroundColor:"#FEFEFE"
      },
      fullHeight:{
        height:"100vh",
        overflow: "hidden",
        paddingBottom: 100
      }
  }));
  
const AppLayout = ({children}) => {
    const classes = useStyles();
    const [modal, setModal] = React.useState(0);
    const handleClose = () => setModal(0);
    const handleAddTrack = (event) => {
        setModal(1)
    }
    const handleCreatePlaylist = (event) => {
        setModal(2)
    }
    return (
        <PlayerProvider>
            <Grid container>
            <Player handleAddTrack={handleAddTrack}/>
            <Grid container className={classes.fullHeight}>
                <Grid item xs = {2}>
                    <Sidebar handleCreatePlaylist={handleCreatePlaylist}/>
                </Grid>
                <Grid
                    item
                    xs = {10}
                    className={classes.container}>
                    {children}
                </Grid>
                <AddTrack handleClose={handleClose} open={modal===1} />
                <CreatePlaylist handleClose={handleClose} open={modal===2} />
            </Grid>
            </Grid>
        </PlayerProvider>
    );
}

export default AppLayout;