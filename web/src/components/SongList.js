import React from 'react'

import { Avatar, Grid } from '@material-ui/core';
import {Heart, Play, Plus} from 'react-feather';

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

  const TrackItem = () => {
    return (
        <Grid container direction="row" alignItems="center">
            <Avatar style={{
                width:50,
                height:50,
                borderRadius:10,
                marginRight:12
            }} alt="nf" src="https://i.ytimg.com/vi/glNleDYUPu4/maxresdefault.jpg" />
            <text style={{
                fontFamily:"Poppins"
            }}>
                Dreams
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

const SongList = () => {
    const classes = songListStyles();
    const handleLike = (event)=>{
      //need to make this flexible
    }
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
            {rows.map((row) => {
              return (
                <TableRow tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id=="like" && value==1 && <IconButton onClick={handleLike}><Heart style={{color:"#EF757D",fill:"#EF757D"}}/></IconButton>}
                        {column.id=="like" && value==0 && <IconButton onClick={handleLike}><Heart /></IconButton>}
                        {column.id!="like" && value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default SongList;