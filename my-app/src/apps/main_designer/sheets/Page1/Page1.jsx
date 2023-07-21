import {
    // Header,
    Board,
    Console,
} from '../../../components';

import {getElementById} from '../../../utils'
import React, { useState} from 'react';
import data_objects from './jsobject'

  const Page1 = () => {
    console.log('>>>>>>>>>>>>',typeof data_objects)
    const [templateJSON, setTemplateJSON] = useState(data_objects);
    let arrGrid = Array(50).fill(Array(50).fill(0)); 

    const changeTemplateJSON =(value)=>{
      console.log('changeTemplateJSON>>',value)
      setTemplateJSON(JSON.parse(value))
    }
    return (        
        <div
        >   
          <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0', height:'100vh', verticalAlign: "top"}}>
            <Console data_objects={templateJSON} set_data_objects={changeTemplateJSON} />
          </div>
          <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0', height:'100vh', verticalAlign: "top"}}>123123</div>
          <div style={{display: "inline-block"}}>
            <Board grid = {arrGrid} data_objects={templateJSON}/>
          </div>
        </div>
    )
  }

  export default Page1;