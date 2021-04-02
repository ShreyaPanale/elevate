import React from 'react'
import TopBar from '../../components/TopBar';

import { Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongList from '../../components/SongList'
const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,
        height:'100%',
        width:'100%'
    }
}))

const artist = {
    id: 123,
    name: "NF",
    imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
}  

const Artist = () => {
    const classes = useStyles();
    return (
        <Grid container direction="row">
            <Grid item xs={12} >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            <div className={classes.root}>
                    <div style={{display:"inline-flex",alignSelf:'start'}}>
                        <h1 style={{
                            alignItems:'center',
                            display:'flex',
                            justifyContent:'center'
                        }}>
                        <Avatar
                                style={{
                                    width:60,
                                    height:60,
                                    borderRadius:100,
                                    display:'inline-flex',
                                    marginRight:20
                                }} 
                                src={artist.imageUrl}
                            /> {artist.name}
                        </h1>
                    </div>
                    <div item xs={12} style={{}}>
                        <SongList />
                    </div>
            </div>
        </Grid>
    )
}

export default Artist
