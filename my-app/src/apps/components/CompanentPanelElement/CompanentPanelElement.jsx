/* eslint-disable react/jsx-no-duplicate-props */
import React, {useState, useEffect} from "react";
import styles from './CompanentPanelElement.module.css'
// import {Button} from '../'

import { dragNewElementElement } from "../../utils";

const CompanentPanelElement = (props) => {
    const [mode, setMode] = useState('STAND') /*STAND MOVE*/
    // const [elemStyle, setElemStyle] = useState(props.content.style)
    
    const originalStyle = JSON.parse(JSON.stringify(props.content.style));
    delete originalStyle['position']
    delete originalStyle['left']
    delete originalStyle['top']
    const [elemStyle, setElemStyle] = useState(JSON.parse(JSON.stringify(originalStyle)))
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
        setElemStyle(originalStyle)
        setMode('STAND')
        props?.setMouseMode('HANDLE')
        props.setNewItem(null)
    }

    const getElemForPanel=()=>{
        switch (props.type) {
            case 'button':
                return  <div  className={`d-flex justify-content-center align-items-center flex-column ${styles['componentElement']}`}>                
                            <div className="">
                                <button id={props.id} style={elemStyle}>{props.label}</button>
                                {mode==='MOVE'&&<button id={props.id+'phantom'} style={originalStyle} className={styles['phantom']}>{props.label}</button>}
                            </div>
                            <div className="mt-3">{props.label}</div>
                        </div>
                // break;
            case 'table':
                return  <div  className={`d-flex justify-content-center align-items-center flex-column ${styles['componentElement']}`} >                
                            <div>
                                <div id={props.id} className={`${styles['elementButton']}` }>
                                <table className={styles.table}  style={elemStyle}>
                                    <tr>
                                        <th colspan="2"></th>
                                    </tr>            
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>        
                                    <tr>
                                    <td></td>
                                    <td></td>
                                    </tr>
                                </table>
                                </div>
                            </div>
                            {
                                mode==='MOVE'&&
                                    <button className={`${styles['elementButton']}`}>
                                    <table className={`${styles.table} ${styles.phantom}`}>
                                        <tr>
                                            <th colspan="2"></th>
                                        </tr>            
                                        <tr>
                                            <td></td>
                                            <td></td>
                                        </tr>        
                                        <tr>
                                        <td></td>
                                        <td></td>
                                        </tr>
                                    </table>
                                    </button>
                            }
                            <div className="">{props.label}</div>
                        </div>                        
                // break;
            case 'input':
                return  <div  className={`d-flex justify-content-center align-items-center flex-column ${styles['componentElement']}`} >
                            <div id={props.id} className={`${styles['elementButton']}` }>
                                <input className={styles.input}  style={elemStyle}></input>
                            </div>
                            {
                                mode==='MOVE'&&
                                    <button className={`${styles['elementButton']}`}>
                                            <input className={`${styles["input"]} ${styles["phantom"]}`}></input>
                                    </button>
                            }
                            <div className="">{props.label}</div>
                        </div>                        
                // break;
            case 'label':
                return  <div  className={`d-flex justify-content-center align-items-center flex-column ${styles['componentElement']}`} >
                            <div id={props.id} className={`${styles['elementButton']}` }>
                                <div className={styles.input}  style={elemStyle}>{props.label}</div>
                            </div>
                            {
                                mode==='MOVE'&&
                                <div className={`${styles["label"]} ${styles["phantom"]}`}>{props.label}</div>
                            }
                        </div>                        
                // break;
                
            case 'div':
                return  <div  className={`d-flex justify-content-center align-items-center flex-column ${styles['componentElement']}`} >
                            <div id={props.id} className={`${styles['elementButton']}` }>
                                <div className={styles.input}  style={elemStyle}/>
                            </div>
                            {
                                mode==='MOVE'&&                                    
                                <div style={originalStyle}  className={`${styles["phantom"]}`}/>
                            }
                            <div className="">{props.label}</div>
                        </div>                        
                // break;
            default:
                return 'ERROR'
                // break;
    }
    }
    useEffect(()=>{
        dragNewElementElement(props.id, changeStyle , changeSetMode)
    })
    useEffect(()=>{},[elemStyle])

    return (
        <div>  
            {getElemForPanel()}
        </div>
    )
}


export default CompanentPanelElement;