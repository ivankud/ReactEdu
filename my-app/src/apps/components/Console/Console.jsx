import React from "react";
import 
    styles from
'./Console.module.css';

const Console = () =>{
    let value = '---332--'
    return (
        <div 
            className = {styles['main_console']}
        >
            <textarea onChange={()=>console.log('change')}>{value}</textarea>
        </div>
    )
}

export default Console;