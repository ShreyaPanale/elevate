import React from 'react'

import { Avatar, Grid, IconButton } from '@material-ui/core';
import {Heart, Play, Pause, Plus} from 'react-feather';
import { usePlayer } from '../webplayer';
import { makeStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const songListStyles = makeStyles(()=>({
    root: {
        width: '100%',
      },
      container: {
          maxHeight: 600
      },
}))

const columns = [
    { id:'play', minWidth:30, align:'center'},
    { id: 'place', label: '#', minWidth: 30 },
    { id: 'title', label: 'Track', minWidth: 200 },
    {
      id: 'artist',
      label: 'Artist',
      minWidth: 100
    },
    {
      id: 'plays',
      label: 'Plays',
      minWidth: 100,
    },
    {
      id: 'time',
      label: 'Time',
      minWidth: 100,
    },
    {
        id:'like',
        minWidth: 30
    },
    {
        id:'plus',
        minWidth: 30
    }
  ];

  const TrackItem = ({track}) => {
    return (
        <Grid container direction="row" alignItems="center">
            <Avatar style={{
                width:50,
                height:50,
                borderRadius:10,
                marginRight:12
            }} alt="nf" src={track.coverUrl} />
            <text style={{
                fontFamily:"Poppins"
            }}>
                {track.tname}
            </text>
        </Grid>
    )
  }

const SongRow = ({row}) => {
  const { setLike:modifyLike, likedSongs } = usePlayer();
  const [like,setLike] = React.useState(row['like']);
  React.useEffect(()=>{
    likedSongs.includes(row['tid'])?setLike(1):setLike(0);
  },[likedSongs])
  const handleLike = (tid)=>{
    console.log("LIKES", tid)
    if(like) {
      setLike(0)
      modifyLike(tid,0)
    }
    else{
      setLike(1)
      modifyLike(tid,1)
    } 
  }
  return (
      <TableRow tabIndex={-1} key={row.code}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align} style={{fontFamily:"Poppins"}}>
                  {column.id=="like"?<IconButton onClick={()=>handleLike(row['tid'])}><Heart style={like==1?{color:"#EF757D",fill:"#EF757D"}:{}}/></IconButton> :value}
                </TableCell>
              );
            })}
          </TableRow>
  )
}
const SongList = ({tracks}) => {
    const classes = songListStyles();
    const [likes, setLikes] = React.useState()
    const { likedSongs, handleAddTrack, addToQueue, songQueue, playing, currIndex, toggle, playNow } = usePlayer();
    const [loading,setLoading] = React.useState(true);
    React.useEffect(()=>{ setLikes(likedSongs);setLoading(false)},[likedSongs])
    console.log(likes)
    return (
        <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color:'#383838', fontFamily:'Poppins', fontSize: 16  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading?<p>loading...</p>:tracks && tracks.map((track,idx) => {
              return (
                <SongRow row={{
                  play: songQueue[currIndex] === track? playing?<Pause style={{color:'#E7576D'}} onClick={()=>toggle()} />: <Play style={{color:'#E7576D'}} onClick={()=>toggle()} />: <Play onClick={()=>{
                    if(songQueue.includes(track)) playNow(track)  
                    else addToQueue(track)
                    }} />,
                  place: idx+1,
                  title: <TrackItem track={track} />,
                  artist:track.aname,
                  plays: track.plays,
                  time: track.time,
                  like: likes.includes(track.tid)?1:0,
                  plus: <IconButton onClick={()=>handleAddTrack(track.tid)}><Plus  /></IconButton>,
                  tid: track.tid
                }} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default SongList;