import React from 'react'
import TopBar from '../components/TopBar';

import { Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(()=>({
    root: {
        minWidth: 220,
        '&:hover':{
            cursor:'pointer',
            boxShadow: "0px 2px 2px #EF757D",
        },
        transition:'300ms',
        marginRight:40,
      },
      media: {
        height: 150,
      },
      title:{
        fontSize:20,
        color:"#383838",
        fontWeight:600,
        fontFamily:"Poppins"
      },
      artist:{
        fontSize:14,
        color:"#9D9EA0",
        fontFamily:"Poppins"
      }
}))

const SongCard = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
            className={classes.media}
            image = "https://i.ytimg.com/vi/glNleDYUPu4/maxresdefault.jpg"
            title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom className={classes.title}>
                Dreams
            </Typography>
            <Typography className={classes.artist}>
                NF
            </Typography>
            </CardContent>
      </Card>
    )
}

export default SongCard;