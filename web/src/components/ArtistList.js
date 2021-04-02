import React from 'react';
import { useHistory } from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import { Avatar, Grid} from '@material-ui/core';
import ROUTES from '../routes';
const artists = [
    {
        id: 123,
        name: "NF",
        imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
    },
    {
        id: 123,
        name: "NF",
        imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
    },
    {
        id: 123,
        name: "NF",
        imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
    },{
        id: 123,
        name: "NF",
        imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
    },{
        id: 123,
        name: "NF",
        imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
    },{
        id: 123,
        name: "NF",
        imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
    },{
        id: 123,
        name: "NF",
        imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
    },{
        id: 123,
        name: "NF",
        imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
    },{
        id: 123,
        name: "NF",
        imageUrl : "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/nf.jpg?itok=ZSBlQuYh"
    },  
]

const useStyles = makeStyles(()=>({
    hover:{
        '&:hover':{
            cursor:'pointer',
            boxShadow: "0px 2px 2px #EF757D",
        },
    }
}))
const ArtistList = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Grid container direction="row" spacing={10} style={{padding:20}}>
            {
                artists.map(artist => 
                    <Grid item direction="column" justify="center" align="center">
                        <Grid item onClick={()=>{
                            history.push(ROUTES.genArtist(artist.id))
                        }}>
                            <Avatar 
                                className={classes.hover}
                                style={{
                                    width:200,
                                    height:200,
                                    borderRadius:100,
                                }} 
                                src={artist.imageUrl}
                            />
                        </Grid>
                        <Grid item style={{
                                fontFamily:"Poppins",
                            }}>
                                {artist.name}
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    );
}

export default ArtistList;