import React, {useEffect} from "react";
import styles from './CompanentPanel.module.css'

import {CompanentPanelElement} from "../";

import {
    dragNewElementElement,
    dragElement
} from './../../utils'

const CompanentPanel = (props) => {
    // useEffect(
    //     ()=>{
    //         // dragElement(document.getElementById('Button_1'))
    //     }
    // )
    
    return (
        <div className={styles.MainComponentPanel + ' d-flex justify-content-center align-items-center'}>
            <div className={`${styles.SlideComponentPanel} d-flex justify-content-center d-flex flex-wrap`}>
                <div className="d-flex flex-row">
                    <div className="p-2">
                        <CompanentPanelElement id='Button_1' type='Button' label='Кнопка' setMouseMode = {props?.setMouseMode} setNewItem={props.setNewItem} content={{"tag": "button","id": "ButtonTemplate","style": {"backgroundColor": "red","position": "absolute","left": "30px","top": "30px"},"content": 'Кнопка1'}}/>
                    </div>
                    {/* <div className="p-2">
                        <CompanentPanelElement id='Button_2' type='Button' content='Кнопка2'/>
                    </div>
                    <div className="p-2">
                        <CompanentPanelElement id='Button_3' type='Button' content='Кнопка3'/>
                    </div> */}
                </div>
                <div className="d-flex flex-row">
                    {/* <div className="p-2">
                        <CompanentPanelElement id='Button_4' type='Button' content='Кнопка4'/>
                    </div>
                    <div className="p-2">
                        <CompanentPanelElement id='Button_5' type='Button' content='Кнопка5'/>
                    </div>
                    <div className="p-2">
                        <CompanentPanelElement id='Button_6' type='Button' content='Кнопка6'/>
                    </div> */}
                </div>                
                <div className="d-flex flex-row">
                    {/* <div className="p-2">
                        <CompanentPanelElement id='Button_7' type='Button' content='Кнопка7'/>
                    </div>
                    <div className="p-2">
                        <CompanentPanelElement id='Button_8' type='Button' content='Кнопка8'/>
                    </div>
                    <div className="p-2">
                        <CompanentPanelElement id='Button_9' type='Button' content='Кнопка9'/>
                    </div> */}
                </div>
                
            </div>
        </div>
    )
}


export default CompanentPanel;