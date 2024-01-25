
import React, {useState, useEffect} from 'react';

// import styles from './ResizableBox.module.css';
// import { Button } from 'reactstrap';
// import {justDragElement} from '../../utils'

const ResizableBox = (props)=> {
    let originalStyleKey = Object.keys(props.data_objects.style)
    let originalStyte = JSON.parse(JSON.stringify(props.data_objects.style));
    const [divStyle, setDivStyle] = useState({...{left: props.style.left, top: props.style.top, width: props.style.width, height: props.style.height},...{position: "absolute",   borderStyle:'groove', borderColor:'pink', zIndex:1}})    
    const stylebc = {resize: "both", overflow: "auto"}
    const callbackSetStyle=()=>{
      /*функция прокидывает стиль наверх в конце изменения размера, когда мышка отпущена*/
      let vElem = document.getElementById('SelObjectFrame');  
      let vStyle = {position:vElem.style.position, left:vElem.style.left,top:vElem.style.top,width:vElem.style.width,height:vElem.style.height,borderStyle:vElem.style.borderStyle, borderColor:vElem.style.borderColor} 
      setDivStyle(vStyle)
      let newStyle={}
      originalStyleKey.forEach(styleElem=>{newStyle[styleElem] = originalStyte[styleElem]})
      newStyle['height'] = vStyle['height']
      newStyle['width'] = vStyle['width']
      let vObject = JSON.parse(JSON.stringify(props.data_objects))      
      vObject.style = newStyle
      props.changeTemplateJSON(JSON.stringify(vObject))
    }
    return (
        <div 
            id='SelObjectFrame' 
            style={{...divStyle, ...stylebc}}  
            onMouseUp=  {()=>{callbackSetStyle()}}
        ></div>      
    )
}

export default ResizableBox;