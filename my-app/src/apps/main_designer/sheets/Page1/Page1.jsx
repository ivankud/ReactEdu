import {
    // Header,
    Board,
    Console,
} from '../../../components';


import React, { useState} from 'react';

  import data_objects from './jsobject'

  const Page1 = () => {
    const [templateJSON, setTemplateJSON] = useState(data_objects);
    let arrGrid = Array(50).fill(Array(50).fill(0)); 
    return (        
        <div
          // style={{position:'static'}}
          // style={{display: "inline-block"}}
        >          
          1 Страница
            <Board grid = {arrGrid} data_objects={templateJSON}/>
            <Console data_objects={templateJSON}/>
        </div>
    )
  }

  export default Page1;