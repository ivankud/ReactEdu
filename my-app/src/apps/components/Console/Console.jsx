import React from "react";
import 
    styles from
'./Console.module.css';

const Console = (props) =>{
    let value = '---332--'
    return (
        <div 
            className = {styles['main_console']}
        >
            <textarea onChange={()=>console.log('change')} defaultValue={JSON.stringify(props.data_objects, null, 4)}/>
            <button onClick={()=>{
                
            }}>
                Save
            </button>
        </div>
    )
}

export default Console;