import React
// , { useState } 
from "react";
import 
    styles from
'./Console.module.css';


import {isValidJson} from '../../utils'

const Console = (props) =>{
    // const [vjs, setVJS] = useState(props.data_objects);
    const ChangeJSON =(VALUE)=>{
        if(isValidJson(VALUE)) {
            props.set_data_objects(VALUE)
        }
        else {
            // setVJS(VALUE)
        }
    }
    return (
        <div 
            className = {styles['main_console']}
        >   
            <textarea
                type="text"
                cols={1} rows={1}
                style={{width:"100%", height:"100%"}} 
                name="Text1" 
                id="Text1"
                onChange={(e)=>{
                    if(isValidJson(e.target.value)) {
                        ChangeJSON(e.target.value)
                    }                    
                    // setVJS(e.target.value)
                }}
                value={JSON.stringify(props.data_objects, null, 4)}
            />
            {/* <button style={{width:"100%", height:"10%"}} onClick={()=>{ChangeJSON(props.data_objects)}}>Save</button> */}
        </div>
    )
}

export default Console;