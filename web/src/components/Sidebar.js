import React from 'react';
import { Box, List, ListItem, Avatar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Home, Info, Settings, LogOut } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../firebase/provider';

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
        transition: "850ms",
        height: "100%",
        backgroundColor:"#F5F6FA",
        flexDirection:"column",
        overflowX:"hidden",
        overflowY:"auto"
    },
    listItem: {
        marginLeft:30,
        "&:hover":{
            cursor:"pointer",
        },
        flexDirection:"column",
        color:'#000'    
    },
    listItemBottom:{
        "&:hover":{
            cursor:"pointer",
        },
        position:"absolute",
        bottom:40
    },
    title :{
        color:'#9D9EA0',
        fontWeight:500
    }
}))


const Indicator = ({active}) => {
    return (
        <div style = {{
            minHeight:8,
            minWidth:8,
            backgroundColor:active?"#FF8400":"transparent",
            borderRadius:100,
            margin:2
        }}
        />
    )
}

const ListGroup = ({title, tabs, index}) => {
    const classes = sidebarStyles();
    return (
        <>
        <ListItem 
            alignItems={'start'}
            className={classes.listItem+" "+classes.title} 
            style = {{marginTop:index==0?0:"12%"}}
        >
           {title}
        </ListItem>
        {
            tabs.map(tab => 
            <ListItem 
                alignItems={'start'}
                className={classes.listItem} 
            >
                    {tab}
            </ListItem>)
        }
        </>
    )
}

const Sidebar = () => {
    const classes = sidebarStyles();
    const [index, setIndex] = React.useState(0);
    const history = useHistory();
    const { currentUser:user } = useAuth();
    const sidebarGroups = {
        "Browser Music" : {
            "tabs" : ["Discover", "Artists", "Songs"],
            "functions": []
        },
        "Your Music" : {
            "tabs": ["Favourites", "Play History"],
            "functions": []
        },
        "Playlists" : {
            "tabs": ["Pop time", "Punk Rock"],
            "functions": [],
        }
    }
    return (
        <div className = {classes.root}>
            <Logo />
            <List style = {{ height:"100%"}}>
                {
                    Object.keys(sidebarGroups).map((title,index) => 
                        <ListGroup
                            index = {index}
                            title = {title}
                            tabs = {sidebarGroups[title].tabs}
                            functions = {sidebarGroups[title].functions}
                        />
                    )
                }
            </List>
        </div>
    )
}

export default Sidebar