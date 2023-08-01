import {
    Button,
    Board,
    Console,
    ObjectJson,
    ObjectTargetInfo,
    CompanentPanel,
    CompanentPanelElement
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
    const [mouseMode, setMouseMode] = useState('HANDLE'); /*HANDLE MOVENEWITEM DELETEITEM COPYITEM*/
    const [overTargetID,setOverTargetID] = useState(null);
    const [newItem, setNewItem] = useState(null)
    const [selectionFrameSize, setSelectionFrameSize] = useState({width:0, height: 0})
    const [messageConsole, setMessageConsole] = useState({})
    const [modeConsole, setModeConsole] = useState('TARGET')
    const [MainJson, setMainJSON] = useState(data_objects);
    const [targetId, setTargetId] = useState('child2');
    const [targetPath, setTargetPath] = useState(getPathById(MainJson,targetId));
    const [templateJSON, setTemplateJSON] = useState(getElementById(MainJson,targetId));
    // catchByObject(targetNode, "id", selectedElem)
      // selectedElem=[...selectedElem.filter(id=>id!=='')]
    const [selectedElems, setSelectedElems] = useState([])
    let arrGrid = Array(35).fill(Array(35).fill(0)); 

    function changeMessageConsole(eventmessage){
      /*Добавляет сообщения в консоль*/
      let vmessageConsole = JSON.parse(JSON.stringify(messageConsole));
      vmessageConsole[`${moment(new Date()).format('YYYY.MM.DD hh:mm:ss')}`] = `${eventmessage}`
      setMessageConsole(vmessageConsole)
    }

    function changeTargetId(valueId, targetNode){
      /*Функция меняет выбранный объект
      * valueId - id выбранного объекта
      * targetNode - элемент DOM-дерева, нужен чтобы выщитать все вложенные объекты
      */
      if(valueId) {
        let selectedElem = []
        if(targetNode) catchByObject(targetNode, "id", selectedElem)
        selectedElem=[...selectedElem.filter(id=>id!=='')]
        let path = getPathById(MainJson,valueId);
        let templateJSON = getElementById(MainJson,valueId)
        setTargetId(valueId)
        setSelectedElems(selectedElem)
        setTargetPath(path)
        setTemplateJSON(templateJSON)
        setSelectionFrameSize({})
        changeMessageConsole(`Выбран объект ${valueId}`)
      }
    }
    const changeTemplateJSON =(value)=>{
      /*Устанавливает и меняет выбранный объект*/
      setTemplateJSON(JSON.parse(value))
      setMainJSON(updateObject(MainJson,targetPath,JSON.parse(value)))
      changeMessageConsole(`Изменен выбранный объект ${JSON.parse(value)['id']}-path>>${targetPath}`)
    }

    const addNewChildOnElement=(event)=>{
      let vTargetNode = document.getElementById(overTargetID)
      changeTargetId(overTargetID,vTargetNode)
      let vTemplateJSON = getElementById(MainJson,overTargetID)
      setTemplateJSON(vTemplateJSON)
      let rect = event.target.getBoundingClientRect();
      let x = event.clientX - rect.x;
      let y = event.clientY - rect.y;
      let vNewItem = JSON.parse(JSON.stringify(newItem))
      vNewItem.style.left = x+'px'
      vNewItem.style.top = y+'px'
      /*вычисление id для нового объекта↓↓↓↓↓↓*/
      let vNextItemId = (vNewItem.id).replace('Template','')
      let aID =[]
      catchByObject(MainJson,'id',aID)
      let varr = aID.map(item=>item.toLowerCase())
                    .filter(item=>!item.search(new RegExp(vNextItemId,'i')))
                    .filter(item=>!isNaN(Number(item.split('_')[1])))
                    .map(item=>Number(item.split('_')[1]))
      let vLen = varr.length; /*Так надо*/
      let nextID = vLen>0?(Math.max(...varr)+1):1
      vNewItem.id = vNextItemId+"_"+String(nextID)
      /*вычисление id для нового объекта↑↑↑↑↑↑*/
      vTemplateJSON.children.push(vNewItem)
      setTemplateJSON(vTemplateJSON)
      changeMessageConsole(`В объект ${overTargetID} добавлен новый компонент ${vNewItem.id}`)
      console.log('vNewItem>>>',vNewItem)
      changeTargetId(vNewItem.id)
    }

    const catchByObject=(object, tag, value)=>{
      // console.log('object',object)
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

    const changeSelectionFrame=()=>{
      /*Вычисляет рамку объеденяющую родительский компонент и всех входящих элементов - здесь не происходит вычисление потомков selectedElems, они вычисляются в другом месте*/
      let minX , minY , maxX , maxY 
      let aX = [] , aY = []
      if(targetId && targetId !== 'main_object' && selectedElems) {
        selectedElems.forEach(id=>{
          let vRect = document.getElementById(id).getBoundingClientRect();
          aX.push(vRect.x)
          aX.push(vRect.x+vRect.width)
          aY.push(vRect.y)
          aY.push(vRect.y+vRect.height)
          minX = Math.min(...aX)
          maxX = Math.max(...aX)
          minY = Math.min(...aY)
          maxY = Math.max(...aY)
          dragElement(document.getElementById(targetId),changeСoordinatesSelectedElem)
          setSelectionFrameSize({width:maxX-minX, height: maxY-minY})
        })        
      } 
    }
    useEffect(()=>{
      /*вешает событие drag на компонент*/
      if(targetId !== 'main_object') {
        dragElement(document.getElementById(targetId),changeСoordinatesSelectedElem)
      }
    },[MainJson,selectedElems,targetId,selectionFrameSize])
    
    useEffect(()=>{      
      /*вычисляет размеры рамки объекта*/
      /*P.S. надо пропихнуть такое же событие на изменение положение элемента, но пока пусть будет так*/ 
      changeSelectionFrame()
    },[MainJson,selectedElems])
    return (        
        <div>
          <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0', height:'65vh', verticalAlign: "top", width:'300px'}}>
            <ObjectTargetInfo targetPath={targetPath} targetId={targetId} changeTargetId={changeTargetId}/>
            <ObjectJson data_objects={templateJSON} set_data_objects={changeTemplateJSON}  changeMessageConsole={changeMessageConsole}/>
          </div>
          <div style={{display: "inline-block",height:'65vh'}}>
            <Board 
              grid = {arrGrid}
              data_objects={MainJson}
              changeTargetId={changeTargetId}
              targetId={targetId}
              selectedElems={selectedElems}
              selectionFrameSize={selectionFrameSize}
              mouseMode={mouseMode}
              addNewChildOnElement={addNewChildOnElement}
              setOverTargetID={setOverTargetID}/>
          </div>
          <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0', height:'65vh', verticalAlign: "top", width:'300px'}}>
            <CompanentPanel setMouseMode={setMouseMode} setNewItem={setNewItem}/>
          </div>
          <div>
          {JSON.stringify(mouseMode)}
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
            {modeConsole==='TARGET'&&<Console data_objects={templateJSON}/>}
            {modeConsole==='MAIN'&&<Console data_objects={MainJson}/>}
            {modeConsole==='CONSOLE'&&<Console data_objects={JSON.parse(JSON.stringify(objectReverse(messageConsole),null,4))}/>}
          </div>
        </div>
    )
  }

  export default Page1;