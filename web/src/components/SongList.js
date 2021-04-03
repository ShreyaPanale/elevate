import React from 'react'

import { Avatar, Grid, IconButton } from '@material-ui/core';
import {Heart, Play, Plus} from 'react-feather';
import { usePlayer } from '../webplayer/provider';
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

  let rows = [
    {
        play: <Play />,
        place: 1,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: 1,
        plus: <Plus />
    },
    {
        play: <Play />,
        place: 2,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: 0,
        plus: <Plus />
    },
    {
        play: <Play />,
        place: 3,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: 1,
        plus: <Plus />
    },
    {
        play: <Play />,
        place: 4,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: 0,
        plus: <Plus />
    },
    {
        play: <Play />,
        place: 5,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: 1,
        plus: <Plus />
    },
    {
        play: <Play />,
        place: 6,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: 1,
        plus: <Plus />
    },
    
  ];

const SongRow = ({row}) => {
  const [like,setLike] = React.useState(row['like']);
  const handleLike = ()=>{
    if(like) setLike(0)
    else setLike(1)
  }
  return (
      <TableRow tabIndex={-1} key={row.code}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.id=="like"?<IconButton onClick={handleLike}><Heart style={like==0?{color:"#EF757D",fill:"#EF757D"}:{}}/></IconButton> :value}
                </TableCell>
              );
            })}
          </TableRow>
  )
}
const SongList = ({tracks}) => {
    const classes = songListStyles();
    const { likedSongs } = usePlayer();
    let rowsForSong = tracks && tracks.map(
      track => ({
        play: <Play />,
        place: 6,
        title: <TrackItem track={track} />,
        artist:track.aname,
        plays: track.plays,
        time: track.time,
        like: (track.id in likedSongs)?1:0,
        plus: <Plus />
      })
    )
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
            {rowsForSong && rowsForSong.map((row) => {
              return (
                <SongRow row={row} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default SongList;