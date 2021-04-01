import React from 'react'
import TopBar from '../components/TopBar';

import { Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongCard from '../components/SongCard';

import {Heart, Play} from 'react-feather';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(()=>({
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,   
    },
    horizontal:{
        overflowX:'auto',
        flexDirection:"row",
        display:'inline-flex',
        paddingBottom:"2%",
        width:'100%',
        "&::-webkit-scrollbar": {
            display: "none",
            width:'0 !important'
        },
        paddingLeft:20
    }
}))

const songListStyles = makeStyles(()=>({
    root: {
        width: '100%',
      },
      container: {
          
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
        minWidth: 50
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

  const rows = [
    {
        play: <Play />,
        place: 1,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: <Heart/>
    },
    {
        play: <Play />,
        place: 1,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: <Heart/>
    },
    {
        play: <Play />,
        place: 1,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: <Heart/>
    },
    {
        play: <Play />,
        place: 1,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: <Heart/>
    },
    {
        play: <Play />,
        place: 1,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: <Heart/>
    },
    {
        play: <Play />,
        place: 1,
        title: <TrackItem />,
        artist:"NF",
        plays: 200,
        time: "02:40",
        like: <Heart/>
    },
  ];

const SongList = () => {
    const classes = songListStyles();
    return (
        <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
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

const Dashboard = () => {
    const classes = useStyles();
    return (
        <div style = {{display:"flex",flexDirection:'column', maxWidth:'100%'}} direction="row">
            <Grid item container >
                <TopBar placeholder = {"Search for songs or artists"} />
            </Grid>
            
            <Grid item container direction="row" className={classes.root}>
                <Grid item container direction="column">
                    <Grid item>
                        <h2 className={classes.sectionTitle}>
                            Recommended Songs
                        </h2>
                    </Grid>
                    <Grid item className={classes.horizontal}>
                        {
                            [1,2,3,4,5,6,7,8].map(idx =><SongCard />)
                        }
                    </Grid>
                </Grid>

                <Grid item container direction="column">
                    <Grid item>
                        <h2 className={classes.sectionTitle}>
                            Top Songs
                        </h2>
                    </Grid>
                    <Grid item className={classes.horizontal}>
                        <SongList />
                    </Grid>
                </Grid>
            </Grid>
            
            
            
        </div>
    )
}

export default Dashboard;