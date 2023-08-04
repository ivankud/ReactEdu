import React
// , {useEffect}
 from "react";
import styles from './CompanentPanel.module.css'

import {CompanentPanelElement} from "../";

import {
    // dragNewElementElement,
    // dragElement
} from './../../utils'

const CompanentPanel = (props) => {
    let elements = [
                        {"tag": "button","id": "ButtonTemplate","style": {"position": "absolute","left": "30px","top": "30px","backgroundColor":"green", "width":"75px", "height":"30px"},"content": 'Кнопка1'},
                        {"tag": "button","id": "ButtonType2Template","style": {"position": "absolute","left": "30px","top": "30px","backgroundColor":"red", "width":"75px", "height":"30px"},"content": 'Кнопка2'},
                        {"tag": "table","id": "TableTemplate","style": {"position": "absolute","left": "30px","top": "30px", "width":"75px", "height":"40px"},"content": 'Таблица'},
                        {"tag": "input","id": "InputTemplate","style": {"position": "absolute","left": "30px","top": "30px", "width":"75px", "height":"30px"},"content": 'Поле ввода'},
                        {"tag": "label","id": "LabelTemplate","style": {"position": "absolute","left": "30px","top": "30px", "width":"75px", "height":"30px"},"content": 'Надпись'},
                        {"tag": "div","id": "DivTemplate","style": {"width":"40px","height":"40px","border-color":"pink","borderStyle":"solid","borderWidth":"5px","position": "absolute","left": "30px","top": "30px"},"content":'Контейнер'},
                    ]
    return (
        <div className={styles.MainComponentPanel + ' d-flex justify-content-center align-items-center'}>
            <div className={`${styles.SlideComponentPanel} d-flex align-content-start flex-wrap`}>
                <div className="d-flex flex-row">
                    <div className="p-2">
                        <CompanentPanelElement id={elements[0].id} type={elements[0].tag} label={elements[0].content} setMouseMode = {props?.setMouseMode} setNewItem={props.setNewItem} content={elements[0]}/>
                    </div>
                     <div className="p-2">
                        <CompanentPanelElement id={elements[1].id} type={elements[1].tag} label={elements[1].content} setMouseMode = {props?.setMouseMode} setNewItem={props.setNewItem} content={elements[1]}/>
                    </div>
                     <div className="p-2">
                        <CompanentPanelElement id={elements[2].id} type={elements[2].tag} label={elements[2].content} setMouseMode = {props?.setMouseMode} setNewItem={props.setNewItem} content={elements[2]}/>
                    </div>
                </div>
                <div className="d-flex flex-row">
                    <div className="p-2">
                        <CompanentPanelElement id={elements[3].id} type={elements[3].tag} label={elements[3].content} setMouseMode = {props?.setMouseMode} setNewItem={props.setNewItem} content={elements[3]}/>
                    </div>
                    <div className="p-2">
                        <CompanentPanelElement id={elements[4].id} type={elements[4].tag} label={elements[4].content} setMouseMode = {props?.setMouseMode} setNewItem={props.setNewItem} content={elements[4]}/>
                    </div>
                    <div className="p-2">
                        <CompanentPanelElement id={elements[5].id} type={elements[5].tag} label={elements[5].content} setMouseMode = {props?.setMouseMode} setNewItem={props.setNewItem} content={elements[5]}/>
                    </div>
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