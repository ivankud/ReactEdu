import React, { useState} from "react";
import 
    styles from
'./Console.module.css';


import {isValidJson} from '../../utils'

const Console = (props) =>{
    const [vjs, setVJS] = useState(props.data_objects);
    console.log(isValidJson(JSON.stringify(vjs)))
    const ChangeJSON =(VALUE)=>{
        Console.log(isValidJson(JSON.parse(vjs)))
        // if(isValidJson(vjs)) {
        //     console.log('GOOD')
        //     setVJS(vjs)
        // }
    }
    return (
        <div 
            className = {styles['main_console']}
        >
            
            <textarea onChange={(e)=>ChangeJSON(e.target.value)} defaultValue={JSON.stringify(vjs, null, 4)}/>
            <button onClick={()=>{
                
            }}>
                Save
            </button>
        </div>
    )
}

export default Console;