import {
    // Header,
    Board,
    Console,
    ObjectJson,
    ObjectTargetInfo
} from '../../../components';

import {
  getElementById,
  getPathById
} from '../../../utils'
import React, { useState} from 'react';
// import data_objects from './jsobject'
import data_objects from '../../../../data/jsobject'

  const Page1 = () => {
    const [MainJson, setMainJSON] = useState(data_objects);
    const [targetId, setTargetId] = useState('child2');
    const [targetPath, setTargetPath] = useState(getPathById(MainJson,targetId));
    // const [templateJSON, setTemplateJSON] = useState(data_objects);
    const [templateJSON, setTemplateJSON] = useState(getElementById(MainJson,targetId));
    let arrGrid = Array(50).fill(Array(50).fill(0)); 

    function changeTargetId(valueId){
      // console.log(valueId)
      let path = getPathById(MainJson,valueId);
      let templateJSON = getElementById(MainJson,valueId)
      // console.log('path>>', path)
      // console.log('templateJSON>>', templateJSON)
      console.log('templateJSON>>', templateJSON)
      setTargetId(valueId)
      setTargetPath(path)
      setTemplateJSON(templateJSON)
    }
    const changeTemplateJSON =(value)=>{
      // console.log('changeTemplateJSON>>',value)
      setTemplateJSON(JSON.parse(value))
    }
    console.log('Page1>>>',changeTargetId)
    return (        
        <div>
          <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0', height:'100vh', verticalAlign: "top", width:'300px'}}>
            <ObjectTargetInfo targetPath={targetId} targetId={targetPath} changeTargetId={changeTargetId}/>
            {/* <Console data_objects={templateJSON} set_data_objects={changeTemplateJSON} /> */}
            <ObjectJson data_objects={templateJSON} set_data_objects={changeTemplateJSON} />
          </div>
          {/* <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0', height:'100vh', verticalAlign: "top"}}>123123</div> */}
          <div style={{display: "inline-block"}}>
            <Board grid = {arrGrid} data_objects={MainJson} changeTargetId={changeTargetId}/>
          </div>
          {/* {JSON.stringify(MainJson)} */}
          {JSON.stringify(templateJSON)}
        </div>
    )
  }

  export default Page1;