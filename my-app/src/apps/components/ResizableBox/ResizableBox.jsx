
import React, {useState, useEffect} from 'react';

import styles from './ResizableBox.module.css';
import { Button } from 'reactstrap';
import {justDragElement} from '../../utils'

const ResizableBox = (props)=> {
    const [bOnMouseDown,setBOnMouseDown] = useState(false)
    let originalStatyKey = Object.keys(props.style)
    const [divStyle, setDivStyle] = useState({...{left: props.style.left, top: props.style.top, width: props.style.width, height: props.style.height},...{position: "absolute",   borderStyle:'solid', borderColor:'pink', zIndex:1}})    
    // const [divStyle, setDivStyle] = useState({position: "absolute", left: "200px",top: "200px", width:"400px", height:"400px",  borderStyle:'solid', borderColor:'pink'})
    const stylebc = {resize: "both", overflow: "auto"}
    const changeStyle =()=>{
      let vElem = document.getElementById('SelObjectFrame');    
      let vStyle = {position:vElem.style.position, left:vElem.style.left,top:vElem.style.top,width:vElem.style.width,height:vElem.style.height,borderStyle:vElem.style.borderStyle, borderColor:vElem.style.borderColor}     
      setDivStyle(vStyle)
      let newStyle={}
      originalStatyKey.forEach(styleElem=>{newStyle[styleElem] = divStyle[styleElem]})
      let vObject = JSON.parse(JSON.stringify(props.data_objects))
      vObject.style = newStyle
      console.log('vObject>>>>',vObject)
      props.changeTemplateJSON(JSON.stringify(vObject))
    }
    return (
        <div id='SelObjectFrame' style={{...divStyle, ...stylebc}}  onMouseDown={()=>{ setBOnMouseDown(true) }}
                                                                  onMouseMove={()=>{if(bOnMouseDown) changeStyle()}}
                                                                  onMouseUp=  {()=>{setBOnMouseDown(false)}}
        ></div>      
    )
}

export default ResizableBox;