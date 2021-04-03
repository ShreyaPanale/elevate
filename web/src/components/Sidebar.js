import React from 'react';
import { List, ListItem, Typography,IconButton} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from 'react-router-dom';
import ROUTES from '../routes';
import { Plus } from 'react-feather'
import {usePlayer} from '../webplayer/provider';

const Logo = () => {
    return (
        <div style = {{display:"flex", color:"#EF757D",  width:"100%", marginLeft:30}}>
            <h1>elevate.</h1>
        </div>
    )
}

const sidebarStyles = makeStyles(() => ({
    root: {
        display:"flex",
        color: "#FFF",
        height: "100vh",
        backgroundColor:"#F5F6FA",
        flexDirection:"column",
        overflow:"none"
    },
    listItem: {
        marginLeft:30,
        "&:hover":{
            cursor:"pointer",
        },
        flexDirection:"row",
        color:'#000'    
    },
    title :{
        color:'#9D9EA0',
        fontWeight:500
    },
    hover:{
        "&:hover":{
            cursor:'pointer'
        }
    }
}))


const Indicator = ({active}) => {
    return (
        <div style = {{
            minHeight:8,
            minWidth:8,
            backgroundColor:active?"#EF757D":"transparent",
            borderRadius:100,
            position:'absolute',
            marginLeft:-20,
            marginTop:8,
            
            transition: "500ms",
        }}
        />
    )
}

const ListGroup = ({title, tabs, index, setActive, active, indices,routes}) => {
    const classes = sidebarStyles();
    const { playlists } = usePlayer();
    const history = useHistory();
    return (
        <>
        <ListItem 
            alignItems={'start'}
            className={classes.listItem+" "+classes.title} 
            style = {{marginTop:index==0?0:"12%", }}
        >
           {title}
        </ListItem>
        {
            title==="Playlists"? playlists.map((playlist,idx) => 
                <ListItem 
                    alignItems={'start'}
                    className={classes.listItem} 
                    onClick = {()=>{
                        setActive(idx+5)
                        history.push(ROUTES.genPlaylist(playlist.pid))
                    }}
                    style = {{fontWeight: idx+5 == active? 700: 400}}
                >
                        <Indicator active = {idx+5 == active}/>
                        {playlist.pname}
                </ListItem>)
            : tabs.map((tab,idx) => 
            <ListItem 
                alignItems={'start'}
                className={classes.listItem} 
                onClick = {()=>{
                    setActive(indices[idx])
                    history.push(routes[idx])
                }}
                style = {{fontWeight: indices[idx] == active? 700: 400}}
            >
                    <Indicator active = {indices[idx] == active}/>
                    {tab}
            </ListItem>)
        }
        </>
    )
}

const Sidebar = (props) => {
    const { handleCreatePlaylist } = usePlayer();
    const classes = sidebarStyles();
    const indexToRoute= {
        [ROUTES.dashboard]:0,
        [ROUTES.artists]:1,
        [ROUTES.songs]:2,
        [ROUTES.favourites]:3,
        [ROUTES.history]:4
    }
    const location = useLocation();
    const [active, setActive] = React.useState(indexToRoute[location.pathname]);
    const sidebarGroups= {
        "Browse Music" : {
            "tabs" : ["Discover", "Artists", "Songs"],
            "indices": [0,1,2],
            "routes": [ROUTES.dashboard, ROUTES.artists, ROUTES.songs]
        },
        "Your Music" : {
            "tabs": ["Favourites", "Play History"],
            "indices": [3,4],
            "routes": [ROUTES.favourites,ROUTES.history]
        },
        "Playlists" : {
             //playlist ids = [1,2]
        }
    }
    return (
        <div className = {classes.root}>
            <Logo />
            <List style = {{
                overflowX:"hidden",
                overflowY:"auto",
                marginBottom:100,
                "&::-webkit-scrollbar": {
                    display: "none",
                    width:'0px !important'
                },
                scrollbarWidth:0,
            }}>
                {
                    Object.keys(sidebarGroups).map((title,idx) => 
                        <ListGroup
                            index = {idx}
                            title = {title}
                            setActive = {setActive}
                            tabs = {sidebarGroups[title].tabs}
                            indices = {sidebarGroups[title].indices}
                            active = {active}
                            routes = {sidebarGroups[title].routes}
                        />
                    )
                }
            <span className={classes.hover} onClick={handleCreatePlaylist} style={{paddingLeft:30,color:"#EF757D",fontSize:12}}><IconButton ><Plus size={15} color="#EF757D"/></IconButton> New Playlist</span>
            </List>
            
        </div>
    )
}

export default Sidebar