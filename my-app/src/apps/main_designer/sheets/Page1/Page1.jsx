import {
    Button,
    Board,
    Console,
    ObjectJson,
    ObjectTargetInfo,
} from '../../../components';

import moment from 'moment/moment';

import {
  getElementById,
  getPathById,
  updateObject,
  objectReverse,
  dragElement
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
    // catchByObject(targetNode, "id", selectedElem)
      // selectedElem=[...selectedElem.filter(id=>id!=='')]
    const [selectedElems, setSelectedElems] = useState([])
    let arrGrid = Array(50).fill(Array(50).fill(0)); 

    function changeMessageConsole(eventmessage){
      /*Добавляет сообщения в консоль*/
      let vmessageConsole = JSON.parse(JSON.stringify(messageConsole));
      vmessageConsole[`${moment(new Date()).format('YYYY.MM.DD hh:mm:ss')}`] = `${eventmessage}`
      setMessageConsole(vmessageConsole)
    }

    function changeTargetId(valueId, targetNode){
      /*Функция меняет выбранный объект*/
      let selectedElem = []
      catchByObject(targetNode, "id", selectedElem)
      selectedElem=[...selectedElem.filter(id=>id!=='')]
      let path = getPathById(MainJson,valueId);
      let templateJSON = getElementById(MainJson,valueId)
      setTargetId(valueId)
      setSelectedElems(selectedElem)
      setTargetPath(path)
      setTemplateJSON(templateJSON)
      changeMessageConsole(`Выбран объект ${valueId}`)
      // document.getElementById(valueId)
    }
    const changeTemplateJSON =(value)=>{
      /*Устанавливает и меняет выбранный объект*/
      setTemplateJSON(JSON.parse(value))
      setMainJSON(updateObject(MainJson,targetPath,JSON.parse(value)))
      changeMessageConsole(`Изменен выбранный объект ${JSON.parse(value)['id']}-path>>${targetPath}`)
    }

    const catchByObject=(object, tag, value)=>{
      console.log('object',object)
      if( object[tag] !== undefined ) {
        value.push(object[tag])
      }
      if( object["children"] !== undefined ) {
        Object.keys(object.children).forEach(key=>{
          catchByObject(object.children[key], tag, value)
          })
      }
    }

    function changeСoordinatesSelectedElem(coord){
      let path = getPathById(MainJson,targetId);
      let vTemplateJSON = getElementById(MainJson,targetId)
      let style = Object.hasOwn(vTemplateJSON,'style')?vTemplateJSON['style']:{};
      style["top"] = coord.top;
      style["left"] = coord.left;
      vTemplateJSON["style"] = style
      setTemplateJSON(vTemplateJSON)
      changeMessageConsole(`Изменен выбранный объект ${vTemplateJSON['id']}-path>>${path}`)
      setMainJSON(updateObject(MainJson,path,vTemplateJSON))
    }

    useEffect(()=>{
      if(targetId !== 'main_object') {
        dragElement(document.getElementById(targetId),changeСoordinatesSelectedElem)
      }
      if(targetId && targetId !== 'main_object' && selectedElems) {
        selectedElems.forEach(id=>{
          let vRect = document.getElementById(id).getBoundingClientRect();
          console.log('vRect>>',vRect)
        })        
      }
    },[targetId])
    
    useEffect(()=>{
      let minX , minY , maxX , maxY 
      let aMinX = [] , aMinY = [], aMaxX = [] , aMaxY = []      
      if(targetId && targetId !== 'main_object' && selectedElems) {
        selectedElems.forEach(id=>{
          let vRect = document.getElementById(id).getBoundingClientRect();
          // console.log('vRect>>',vRect)
          aMinX.push(vRect.x)
          aMinY.push(vRect.y)
          aMaxX.push(vRect.x+vRect.width)
          aMaxY.push(vRect.y+vRect.height)
          // console.log('vRect x y>>',vRect.x,vRect.y, vRect.x+vRect.width, vRect.y+vRect.height)
          minX = aMinX.min()
          minY = aMinY.min()
          maxX = aMinX.max()
          maxY = aMinY.max()
          console.log(`minX: ${minX} minY: ${minY} maxX: ${maxX} maxY: ${maxY}`)
        })        
      }
    },[MainJson,selectedElems])
    return (        
        <div >
          <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0', height:'70vh', verticalAlign: "top", width:'300px'}}>
            <ObjectTargetInfo targetPath={targetPath} targetId={targetId} changeTargetId={changeTargetId}/>
            <ObjectJson data_objects={templateJSON} set_data_objects={changeTemplateJSON}  changeMessageConsole={changeMessageConsole}/>
          </div>
          <div style={{display: "inline-block"}}>
            <Board grid = {arrGrid} data_objects={MainJson} changeTargetId={changeTargetId} targetId={targetId} selectedElems={selectedElems}/>
          </div>
          <div style = {{height:"300px"}}>
            <Button 
              className={modeConsole==='TARGET'?'btn-secondary disabled':'btn-info active'}
              onClick={()=>{setModeConsole('TARGET')}} >
              Выбранный объект
            </Button>
            <Button 
              className={modeConsole==='MAIN'?'btn-secondary disabled':'btn-info active'}
              onClick={()=>{setModeConsole('MAIN')}} >
              Общий объект
            </Button>
            <Button 
              className={modeConsole==='CONSOLE'?'btn-secondary disabled':'btn-info active'}
              onClick={()=>{setModeConsole('CONSOLE')}} >
              Консоль
            </Button>
            {modeConsole==='CONSOLE'&&<Button style={{backgroundColor:'#fa7a7a'}} size="md" onClick={()=>{setMessageConsole({})}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>Очистить консоль
            </Button>}
            {selectedElems}
            {modeConsole==='TARGET'&&<Console data_objects={templateJSON}/>}
            {modeConsole==='MAIN'&&<Console data_objects={MainJson}/>}
            {modeConsole==='CONSOLE'&&<Console data_objects={JSON.parse(JSON.stringify(objectReverse(messageConsole),null,4))}/>}
          </div>
        </div>
    )
  }

  export default Page1;