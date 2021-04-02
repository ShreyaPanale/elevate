import React from 'react'

import {ReactComponent as UnderConstruction} from '../assets/underConstruction.svg';
const Songs = () => {
    return (
        <div style={{display:"flex",alignItems:'center',justifyContent:'center',width:'100%',flexDirection:'column'}}>
            <UnderConstruction height={500} width={500}/>
            Oops, looks like the page is under development!
        </div>
    ) 
}

export default Songs
