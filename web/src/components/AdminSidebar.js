import React from 'react';
import { List, ListItem, Typography,IconButton} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from 'react-router-dom';
import ROUTES from '../routes';
import { LogOut } from 'react-feather'
const Logo = () => {
    return (
        <div style = {{display:"flex", color:"#342D71",  width:"100%", marginLeft:30}}>
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
            backgroundColor:active?"#342D71":"transparent",
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
            tabs.map((tab,idx) => 
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
    const classes = sidebarStyles();
    const indexToRoute= {
        [ROUTES.admintrack]:0,
        [ROUTES.adminartist]:1
    }
    const location = useLocation();
    const [active, setActive] = React.useState(indexToRoute[location.pathname]);
    const sidebarGroups = {
        "Manage Elevate" : {
            "tabs" : ["Tracks","Artists"],
            "indices": [0,1],
            "routes": [ROUTES.admintrack,ROUTES.adminartist]
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
            <span className={classes.hover} style={{paddingLeft:30,color:"#342D71",fontSize:15}}><IconButton onClick={props.handleLogout}><LogOut size={20} color="#342D71"/></IconButton>Logout</span>
            </List>
            
        </div>
    )
}

export default Sidebar