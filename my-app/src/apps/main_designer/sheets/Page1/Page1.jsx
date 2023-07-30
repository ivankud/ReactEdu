import {
    Button,
    Board,
    Console,
    ObjectJson,
    ObjectTargetInfo
} from '../../../components';

import moment from 'moment/moment';

import {
  getElementById,
  getPathById,
  updateObject,
  objectReverse
} from '../../../utils'
import React, { useState, useEffect} from 'react';
// import data_objects from './jsobject'
import data_objects from '../../../../data/jsobject'

  const Page1 = () => {
    // const MainJson = data_objects
    const [messageConsole, setMessageConsole] = useState({})
    const [modeConsole, setModeConsole] = useState('TARGET')
    const [MainJson, setMainJSON] = useState(data_objects);
    const [targetId, setTargetId] = useState('child2');
    const [targetPath, setTargetPath] = useState(getPathById(MainJson,targetId));
    const [templateJSON, setTemplateJSON] = useState(getElementById(MainJson,targetId));
    let arrGrid = Array(50).fill(Array(50).fill(0)); 

    function changeMessageConsole(eventmessage){
      console.log('changeMessageConsole!!!!!!!!! >>',eventmessage)
      let vmessageConsole = JSON.parse(JSON.stringify(messageConsole));
      vmessageConsole[`${moment(new Date()).format('YYYY.MM.DD hh:mm:ss')}`] = `${eventmessage}`
      setMessageConsole(vmessageConsole)
    }

    function changeTargetId(valueId){
      /*Функция меняет выбранный объект*/
      let path = getPathById(MainJson,valueId);
      let templateJSON = getElementById(MainJson,valueId)
      setTargetId(valueId)
      setTargetPath(path)
      setTemplateJSON(templateJSON)
      changeMessageConsole(`Выбран объект ${valueId}`)
    }
    const changeTemplateJSON =(value)=>{
      console.log('asdfasdfasdf>>>', typeof value);
      console.log('asdfasdfasdf>>>',value);
      setTemplateJSON(JSON.parse(value))
      setMainJSON(updateObject(MainJson,targetPath,JSON.parse(value)))
      changeMessageConsole(`Изменен выбранный объект ${JSON.parse(value)['id']}-path>>${targetPath}`)
    }
    useEffect(()=>{},[MainJson])
    return (        
        <div >
          <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0', height:'70vh', verticalAlign: "top", width:'300px'}}>
            <ObjectTargetInfo targetPath={targetPath} targetId={targetId} changeTargetId={changeTargetId}/>
            <ObjectJson data_objects={templateJSON} set_data_objects={changeTemplateJSON}  changeMessageConsole={changeMessageConsole}/>
          </div>
          <div style={{display: "inline-block"}}>
            <Board grid = {arrGrid} data_objects={MainJson} changeTargetId={changeTargetId}/>
          </div>
          <div style = {{height:"300px"}}>
            <Button 
              className={setModeConsole==='TARGET'?'btn-info disabled':'btn-info active'}
              onClick={()=>{setModeConsole('TARGET')}} >
              Выбранный объект
            </Button>
            <Button 
              className={setModeConsole==='MAIN'?'btn-info disabled':'btn-info active'}
              onClick={()=>{setModeConsole('MAIN')}} >
              Общий объект
            </Button>
            <Button 
              className={setModeConsole==='MCONSOLEAIN'?'btn-info disabled':'btn-info active'}
              onClick={()=>{setModeConsole('CONSOLE')}} >
              Консоль
            </Button>
            {modeConsole==='TARGET'&&<Console data_objects={templateJSON}/>}
            {modeConsole==='MAIN'&&<Console data_objects={MainJson}/>}
            {modeConsole==='CONSOLE'&&<Console data_objects={JSON.parse(JSON.stringify(objectReverse(messageConsole),null,4))}/>}
          </div>
        </div>
    )
  }

  export default Page1;