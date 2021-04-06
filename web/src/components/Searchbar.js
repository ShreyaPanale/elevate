import React, {useState} from 'react'
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import {Search} from 'react-feather';
import ROUTES from '../routes';
import {useHistory,useLocation} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
export default function SearchBar({placeholder}) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [ input, setInput ] = useState('');
  const [isSearch,setSearchResult] = React.useState(location.pathname==ROUTES.SearchResult);

  React.useEffect(()=>{
    if(location.pathname==ROUTES.searchResult) setSearchResult(true)
    else if(isSearch) setSearchResult(false)
  },[location])  

  return (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
                <Search color="#000" size={20} />
            </div>
            <InputBase
              placeholder={placeholder}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' ,onFocus:()=>history.push(ROUTES.searchResult)}}
              input={input} onChange={()=>{
                setInput(input);
                if(isSearch){
                    history.goBack();
                } else{
                    history.push(ROUTES.searchResult)
                }
            }}
            />
            
          </div>
  );
}