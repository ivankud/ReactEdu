import React, { useState, useEffect } from "react";
import 
    styles from
'./Console.module.css';


import {isValidJson} from '../../utils'

const Console = (props) =>{
    const [vjs, setVJS] = useState(props.data_objects);
    // console.log(isValidJson(JSON.stringify(vjs)))
    // console.log('props.set_data_objects',props.set_data_objects)
    const ChangeJSON =(VALUE)=>{
        // console.log('ChangeJSON>>START')
        // console.log('ChangeJSON>>VALUE',VALUE)
        if(isValidJson(VALUE)) {
            console.log('ChangeJSON>>ROLLBACK UP')
            console.log(JSON.parse(VALUE))
            // props.set_data_objects(JSON.parse(VALUE))
            props.set_data_objects(VALUE)
        }
        else {
            // console.log('ChangeJSON>>ROLLBACK SETTER')
            setVJS(VALUE)
        }
    }
    // useEffect(()=>{
    //     console.log('useEffect>>',vjs)
    // })
    return (
        <div 
            className = {styles['main_console']}
            // style={{display: "inline-block"}}
        >            
            <textarea 
                onChange={(e)=>{
                    if(isValidJson(e.target.value)) {
                        ChangeJSON(e.target.value)
                    }                    
                    // setVJS(e.target.value)
                }}
                defaultValue={JSON.stringify(props.data_objects, null, 4)}/>
            <button onClick={()=>{
                // console.log(isValidJson(JSON.stringify(vjs)))
                ChangeJSON(props.data_objects)
            }}>
                Save
            </button>
        </div>
    )
}

export default Console;