import React from 'react';
import { Box, List, ListItem, Avatar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

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
        flexDirection:"row",
        color:'#000'    
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
            backgroundColor:active?"#EF757D":"transparent",
            borderRadius:100,
            position:'absolute',
            marginLeft:-20,
            marginTop:8
        }}
        />
    )
}

const ListGroup = ({title, tabs, index, setActive, active, indices}) => {
    const classes = sidebarStyles();
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
            tabs.map((tab,idx) => 
                <ListItem 
                    alignItems={'start'}
                    className={classes.listItem} 
                    onClick = {()=>{setActive(indices[idx])}}
                    style = {{fontWeight: indices[idx] == active? 700: 400}}
                >
                        <Indicator active = {indices[idx] == active}/>
                        {tab}
                </ListItem>)
        }
        </>
    )
}

const Sidebar = () => {
    const classes = sidebarStyles();
    const [active, setActive] = React.useState(0);
    const history = useHistory();

    const sidebarGroups = {
        "Browser Music" : {
            "tabs" : ["Discover", "Artists", "Songs"],
            "indices": [0,1,2]
        },
        "Your Music" : {
            "tabs": ["Favourites", "Play History"],
            "indices": [3,4]
        },
        "Playlists" : {
            "tabs": ["Pop time", "Punk Rock"],
            "indices": [5,6],
        }
    }
    return (
        <div className = {classes.root}>
            <Logo />
            <List style = {{ height:"100%"}}>
                {
                    Object.keys(sidebarGroups).map((title,idx) => 
                        <ListGroup
                            index = {idx}
                            title = {title}
                            setActive = {setActive}
                            tabs = {sidebarGroups[title].tabs}
                            indices = {sidebarGroups[title].indices}
                            active = {active}
                        />
                    )
                }
            </List>
        </div>
    )
}

export default Sidebar