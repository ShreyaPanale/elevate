import React, {useState} from 'react'
import InputBase from '@material-ui/core/InputBase';
import ROUTES from '../routes';
import { useAuth } from "../firebase/provider";

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';
import SongList from '../components/SongList';
import {usePlayer} from '../webplayer';
import {Search} from 'react-feather';

const useStyles = makeStyles((theme) => ({
    profile :{
        '&:hover':{
            cursor:'pointer',
            textDecoration:'underline',
        }
    },
    root:{
        padding:'4%',
        paddingTop:"2%",
        paddingBottom:'1%',
        marginTop:0,   
    },
    search: {
      position: 'relative',
      backgroundColor: "#FFF",
      border:"1px solid #9D9EA0",
      marginRight: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      width: '100%',
      paddingLeft: `calc(1.5em + ${theme.spacing(4)}px)`,
      
    },
  }));

const SearchResult = () => {
    const { currentUser } = useAuth();
    const history = useHistory();
    const classes = useStyles();
    const goBack = () => {
        history.goBack()
      }
      const [ input, setInput ] = useState('');
      const { getTracks } = usePlayer();
      const tracks = getTracks()
      const [ TrackList, setTrackList ] = useState([]);
    
      const updateInput = async (event) => {
        setInput(event.target.value);
      };

      React.useEffect(() => {
        let inputLower = input.toLowerCase();
        const filtered = tracks.filter(track =>
          track.aname.toLowerCase().includes(inputLower) ||
          track.tname.toLowerCase().includes(inputLower)
        );
        setTrackList(filtered);
        console.log(input,input.length,TrackList);
      }, [input]);
        
    
    return (
        <div style = {{display:"flex",flexDirection:'column', maxWidth:'100%'}} direction="row">
            <Grid item container >
                <Grid container direction="row" style = {{marginTop:'2%',paddingLeft:'4%',marginBottom:0,paddingBottom:0}}>
                    <Grid item xs={8} style = {{paddingRight:'8%'}}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search color="#000" size={20} />
                        </div>
                        <InputBase
                        placeholder={"Search for songs or artists"}
                        
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' ,autoFocus:true}}
                        input={input} onInput={updateInput}
                        />
                    </div>   
                    </Grid>
                    <Grid item container justify="flex-end" xs={4} style={{paddingRight:'4%',margin:0 }}>
                        <span
                        className={classes.profile}
                        onClick = {
                        ()=>{
                            history.push(ROUTES.profile)
                        }
                    }>{currentUser.email}</span>
                    </Grid>
                </Grid>
            </Grid>

            <div style = {{display:"flex",flexDirection:'column', width:'100%'}} direction="row">
                <Grid item container direction="row" className={classes.root}>
                
                    <Grid container>
                    <Grid item xs={6}> 
                            <h2 style = {{color:"#EF757D"}}>Search Results</h2>
                    </Grid>
                    <Grid item xs={6} style = {{textAlign: 'right'}}> 
                            <Button onClick={goBack}><h2  style = {{color:"#EF757D", textTransform:'none'}}>Close</h2></Button>
                        </Grid>
                        <Grid item style={{width:'100%'}}>
                            <SongList tracks={TrackList}/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default SearchResult;