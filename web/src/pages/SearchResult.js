import React, {useState} from 'react'
import InputBase from '@material-ui/core/InputBase';
import ROUTES from '../routes';
import { useAuth } from "../firebase/provider";

import { Button, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';
import SongList from '../components/SongList';
import {usePlayer} from '../webplayer';
import {Search} from 'react-feather';
import {default as ArtistListComponent} from '../components/ArtistList';
import {ReactComponent as SearchFail} from '../assets/searchFail.svg'
import {ReactComponent as SearchFail2} from '../assets/searchFail2.svg'
import {ReactComponent as StartSearch} from '../assets/startSearch.svg'
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
    var nameMatch = currentUser.email.match(/[^@]*/);
    const history = useHistory();
    const classes = useStyles();
    const goBack = () => {
        history.goBack()
      }
      const [ input, setInput ] = useState('');
      const { tracks, artists } = usePlayer();

      const [ TrackList, setTrackList ] = useState([]);
      const [ ArtistList, setArtistList ] = useState([]);

      const updateInput = async (event) => {
        setInput(event.target.value);
      };

      React.useEffect(() => {
        if (input.length > 1){
          let inputLower = input.toLowerCase();
          const filteredTracks = tracks.filter(track =>
            track.tname.toLowerCase().includes(inputLower)
          );
          setTrackList(filteredTracks);
          const filteredArtists = artists.filter(artist =>
            artist.aname.toLowerCase().includes(inputLower)
          );
          setArtistList(filteredArtists);
        }
      }, [input]);
        
    const [left,setLeft] = useState(false);
    React.useEffect(()=>{
        setLeft(!left)
    },[input])
    return (
        <div style = {{display:"flex",flexDirection:'column', width:'100%'}} direction="row">
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
                    <Grid item container justify="flex-end" alignItems="center" xs={4} style={{paddingRight:'4%',margin:0 }}>
                      <span
                      className={classes.profile}
                      onClick = {
                          ()=>{
                              history.push(ROUTES.profile)
                          }
                      }>{nameMatch}</span>
                      {
                          currentUser.photoURL?<Avatar alt={nameMatch} style={{marginLeft:10}} src={currentUser.photoURL} />:null
                      }
                    </Grid>
                </Grid>
            </Grid>

            <div style = {{display:"flex",flexDirection:'column', width:'100%'}} direction="row">
                <Grid item container direction="row" className={classes.root}>
                
                    <Grid container style={{width:'100%'}}>
                    <Grid item xs={6}> 
                            <h2 style = {{color:"#EF757D"}}>Search Results</h2>
                    </Grid>
                    <Grid item xs={6} style = {{textAlign: 'right',width:'100%'}}> 
                            <Button onClick={goBack}><h2  style = {{color:"#EF757D", textTransform:'none'}}>Close</h2></Button>
                        </Grid>
                        {
                          input==''? <div style={{alignItems:'center',justifyContent:'center',display:'flex',width:'100%'}}> <StartSearch style={{height:400, width:400}} /></div>
                          :(TrackList.length==0 && ArtistList.length==0) ?
                            <div style={{alignItems:'center',justifyContent:'center',display:'flex',width:'100%'}}>
                              {
                                left?<SearchFail style={{height:400, width:400}} />:<SearchFail2 style={{height:400, width:400}} />
                              }
                            </div>
                          :null
                        }
                        {
                          TrackList.length==0 || input=='' ?null:<><span style={{
                          fontWeight:'bold',
                          fontSize:20,
                          marginTop:'2%'
                        }}>
                          Songs
                        </span>
                        <Grid item style={{width:'100%'}}>
                            <SongList tracks={TrackList}/>
                        </Grid></>}
                        {
                          ArtistList.length==0 || input==''?null:<><span style={{
                            fontWeight:'bold',
                            fontSize:20,
                            marginTop:'4%'
                          }}>
                            Artists
                          </span>
                        
                        <Grid item style={{width:'100%'}}>
                            <ArtistListComponent artists={ArtistList} size={100} />
                        </Grid></>}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default SearchResult;