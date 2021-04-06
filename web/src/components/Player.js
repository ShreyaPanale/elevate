import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, IconButton } from '@material-ui/core';
import { Heart, List, Play, Pause, SkipForward, SkipBack, Plus } from 'react-feather';
import { usePlayer } from '../webplayer';
import {useHistory,useLocation} from 'react-router-dom';
import ROUTES from '../routes';
const useStyles = makeStyles(()=>({
    root:{
        boxShadow: "0px 4px 4px 5px rgba(0, 0, 0, 0.25)",
        background: "#FEFEFE",
        minWidth:"100%",
        position:'absolute !important',
        bottom:0,
        zIndex:20,
        padding:10,
        maxHeight:200,
        display:'flex',
        alignItems:'center'
    },
    progressBar:{
      flex: 1,
      borderRadius: 20,
      margin: '8px 4px',
      height: 4,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    progress:{
        position: 'relative',
        backgroundColor: '#EF757D'
    },
    barTime:{
        fontSize:12,
        color:"#ABABAB"
    }
}))


const Player = () => {
    const classes = useStyles();
    const {audio} = usePlayer();
    const { handleAddTrack, likedSongs, songQueue, currIndex, setLike:modifyLike,playing, toggle, nextSong, prevSong } = usePlayer();
    let duration = songQueue[currIndex] && songQueue[currIndex].duration || 1
    let durationstr = String(Math.floor(duration/60)).padStart(2, '0')+':'+ String(duration%60).padStart(2, '0')
    const [curPercentage,setCurPercentage] = React.useState(0)
    const [currtimestr,setCurtimestr] = React.useState("00:00")
    const history = useHistory();
    const location = useLocation();
    const [like,setLike] = React.useState(0);

    useEffect(()=>{
        (songQueue[currIndex] && likedSongs.includes(songQueue[currIndex].tid))?setLike(1):setLike(0)
    },[likedSongs,currIndex])

    useEffect(() => {
        const interval = setInterval(() => {
            let sec = parseInt(audio.currentTime)
            setCurPercentage(parseInt(sec/duration*100));
            setCurtimestr(String(Math.floor(sec/60)).padStart(2, '0')+':'+ String(sec%60).padStart(2, '0'))
        }, 1000);
        return () => clearInterval(interval);
      }, []);

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.getElementById("progressBar");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    audio.currentTime=calcClickedTime(e);

    const updateTimeOnMove = eMove => {
      audio.currentTime=calcClickedTime(eMove);
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

    const [isQueue,setQueue] = React.useState(location.pathname==ROUTES.queue);

    React.useEffect(()=>{
        if(location.pathname==ROUTES.queue) setQueue(true)
        else if(isQueue) setQueue(false)
    },[location])

    const handleLike = () => {
        if(like==0){
            modifyLike(songQueue[currIndex].tid,1);
            setLike(1)
        }
        else{
            modifyLike(songQueue[currIndex].tid,0);
            setLike(0)
        }
    }
    return (
        <Grid className={classes.root} container direction="row">
            <Grid item xs={1}>
                <Avatar style={{
                    width:80,
                    height:80,
                    borderRadius:10,
                    marginLeft:20
                }} alt="nf" src={songQueue[currIndex] ? songQueue[currIndex].coverurl : null} />
            </Grid>
            <Grid item container xs={2} spacing={1} direction="row" style={{alignItems:'center' }}>
                <Grid item>
                    <Typography style = {{
                        fontFamily: "Poppins",
                        fontSize: 20,
                        fontWeight: 600
                    }}>
                        {songQueue[currIndex] ? songQueue[currIndex].tname:null}
                    </Typography>
                    <Typography style = {{
                        color: "#ABABAB",
                        fontSize:14
                    }}>
                        {songQueue[currIndex] ? songQueue[currIndex].aname:null}
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleLike}>
                        {like==1 && <Heart style={{color:"#EF757D",fill:"#EF757D"}}/>}
                        {like==0 && <Heart />}
                    </IconButton>
                    <IconButton onClick={()=>handleAddTrack(songQueue[currIndex].tid)}>
                       <Plus/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item container xs={8} style={{alignItems:'center'}} direction="column">
                    <Grid item container spacing={4} style={{alignItems:'center',justifyContent:'center'}}>
                        <Grid item>
                            <SkipBack onClick={prevSong} style={{color:currIndex<=0?'#ABABAB':'#000'}} />
                        </Grid>
                        
                        <Grid item>
                            <div 
                            onClick={currIndex<0?()=>{}:toggle}
                            style = {{
                                height:50,
                                width:50,
                                backgroundColor:currIndex<0?'#ABABAB':"#EF757D",
                                borderRadius:100,
                                display:'inline-flex',
                                alignItems:'center',
                                justifyContent:'center',
                            }}>
                                {
                                    playing? 
                                    <Pause style= {{
                                        color:"#FFF",
                                    }}/>
                                    :<Play style= {{
                                        color:"#FFF",
                                        marginLeft:4
                                    }}/> 
                                    
                                }
                            </div>
                        </Grid>
                        <Grid item>
                            <SkipForward onClick={nextSong} style={{color:currIndex==songQueue.length-1?'#ABABAB':'#000'}} />
                        </Grid>
                    </Grid>
                    <Grid item container style={{width:'100%'}}>
                        <span className={classes.barTime}>{currtimestr}</span>
                        <div
                            className={classes.progressBar}
                            id="progressBar"
                            style={{
                                background: `linear-gradient(to right, #EF757D ${curPercentage}%, #C4C4C4 0)`
                            }}
                            onMouseDown={e => handleTimeDrag(e)}
                        >
                            <span
                                className={classes.progress}
                                style={{ left: `${curPercentage - 2}%` }}
                            />
                        </div>
                        <span className={classes.barTime}>{durationstr}</span>
                    </Grid>
            </Grid>
            <Grid item xs = {1} align="end">
                <List style={{color:isQueue?'#EF757D':'#ABABAB'}} onClick={()=>{
                    if(isQueue){
                        history.goBack();
                    } else{
                        history.push(ROUTES.queue)
                    }
                }} />
            </Grid>
        </Grid> 
    );
}

export default Player;