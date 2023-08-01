import React, {useState, useEffect} from "react";
import styles from './CompanentPanelElement.module.css'
import {Button} from '../'

import { dragNewElementElement } from "../../utils";

const CompanentPanelElement = (props) => {
    const [mode, setMode] = useState('STAND') /*STAND MOVE*/
    const [elemStyle, setElemStyle] = useState({})

    const changeStyle =(newStyle)=>{
        var finalStyle={};
        for(let _obj in elemStyle) finalStyle[_obj ]=elemStyle[_obj];
        for(let _obj in newStyle) finalStyle[_obj ]=newStyle[_obj];
        finalStyle['position']='absolute';
        setElemStyle(finalStyle)
        setMode('MOVE')
        props?.setMouseMode('MOVENEWITEM')
        props.setNewItem(props.content)
      }
    const changeSetMode=()=>{
        setElemStyle({})
        setMode('STAND')
        props?.setMouseMode('HANDLE')
        props.setNewItem(null)
    }
    useEffect(()=>{
        dragNewElementElement(props.id,changeStyle , changeSetMode)
    })
    useEffect(()=>{},[elemStyle])

    return (
        <div className={`d-flex justify-content-center align-items-center ${styles['componentElement']}`}>
            <div>
                <button id={props.id} style={elemStyle}>{props.label}</button>
                {mode==='MOVE'&&<button id={props.id+'phantom'} className={styles['phantom']}>{props.label}</button>}
            </div>            
        </div>
    )
}


export default CompanentPanelElement;