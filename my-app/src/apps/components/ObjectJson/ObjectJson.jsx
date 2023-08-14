
import React, {useState, useEffect} from 'react';

// import styles from './ObjectJson.module.css';

// import data_objects from '../../main_designer/sheets/Page1/jsobject';

import ObjectProperty from '../ObjectProperty';
import Console from '../Console';

import { Button } from 'reactstrap';

import { getJSONpropertyType } from '../../utils';

const ObjectJson = (props)=> {
    // const[object, setObject] = useState(props.data_objects)
    const[modeView, setModeView] = useState('TREE')
    const[newProperty, setNewProperty] = useState({})
    const[bAllowSetNewProperty,setBAllowSetNewProperty] = useState(false)
    const[bAddNewProperty,setBAddNewProperty] = useState(false)
    const setProperty =(nameProperty, value)=>{
      let vObject = JSON.parse(JSON.stringify(props.data_objects))
      vObject[nameProperty] = JSON.parse(value);
      props.set_data_objects(JSON.stringify(vObject))
      typeof value === 'string' && props.changeMessageConsole(`Изменено значение тега "${nameProperty}" на знчение >>${value?.replace(/\\/gm,'')}`)
      typeof value !== 'string' && props.changeMessageConsole(`Изменено значение тега "${nameProperty}" на знчение >>${value}`)
    }
    useEffect(()=>{},[props.data_objects])

    if(props.data_objects)
    return (
      <div>
        <div>
          <Button 
            onClick={
              ()=>setModeView('TREE')
            }
            className={modeView==='TREE'?'btn-secondary disabled':'btn-info active'}
          >Свойства</Button>
          <Button 
            onClick={
              ()=>setModeView('CONSOLE')
            }
            className={modeView==='CONSOLE'?'btn-secondary disabled':'btn-info active'}
          >Json</Button>
        </div>
        { 
          modeView ==='TREE' &&  
          <div>{
            Object.keys(props.data_objects).map((_,index) => 
            {            
              let a = {};
              a[Object.keys(props.data_objects)[index]] = props.data_objects[Object.keys(props.data_objects)[index]]
              return Object.keys(props.data_objects)[index]!=='block'&&<ObjectProperty
                                                                            block={props.data_objects['block']}
                                                                            property={a}
                                                                            setProperty={setProperty}
                                                                        />
            })}
            <div className='w-100'>
              <div style={{display:'flex'}}className='w-100'>
                {bAddNewProperty&& <div className='d-flex flex-column' style={{width:'30%'}}>
                                    <input  
                                      style={{width:'100%'}}
                                      className={`${(!props.data_objects.hasOwnProperty(Object.keys(newProperty).join('')) && Object.keys(newProperty).join('').length>0)?'':'bg-danger'}`}
                                      onChange= {
                                        (value)=>{
                                          let newName = value.target.value;
                                          let oldValue = newProperty[Object.keys(newProperty)[0]]??"";
                                          let vNewProperty = {}
                                          vNewProperty[newName] = oldValue
                                          setNewProperty(JSON.parse(JSON.stringify(vNewProperty)))}
                                        } 
                                      defaultValue={newProperty[Object.keys(newProperty)[0]]}
                                    />
                                    {'Тип: '+getJSONpropertyType(newProperty)}
                                    </div>
                }                
                {bAddNewProperty&& <textarea
                                      style={{width:'70%'}}
                                      onChange= {
                                        (value)=>{
                                          let vNewProperty = newProperty
                                          let vVal = value.target.value;
                                          let val;
                                          if(vVal.indexOf('\'')>0 || vVal.indexOf('"')>0) val = vVal
                                          else val = Number(vVal)
                                          if (isNaN(val)) {
                                            if(vVal==='true') val = true
                                            if(vVal==='false') val = false
                                          }
                                          vNewProperty[[Object.keys(newProperty)[0]]] = val
                                          setNewProperty(JSON.parse(JSON.stringify(vNewProperty)))}
                                        } 
                                      defaultValue={newProperty[Object.keys(newProperty)[0]]}
                                    />}            
              </div>
              <div  style={{display:'flex'}}>
              {!bAddNewProperty&& <button 
                                    style={{background:'#c0fafa', border: 'none', borderRadius:'5px', }} 
                                    className='m-auto'
                                    onClick={
                                      ()=>{
                                        setBAddNewProperty(true)
                                      }}
                                  >➕</button>}
              { bAddNewProperty&& <button 
                                    style={{background:'#c0fafa', border: 'none', borderRadius:'5px', }} 
                                    className='m-auto'
                                    disabled={!(!props.data_objects.hasOwnProperty(Object.keys(newProperty).join('')) && Object.keys(newProperty).join('').length>0)}
                                    onClick={
                                      ()=>{
                                        setBAddNewProperty(false)
                                        setProperty(Object.keys(newProperty)[0],newProperty[Object.keys(newProperty)[0]])
                                        setNewProperty({})
                                      }}
                                  >✔</button>}
              { bAddNewProperty&& <button
                                    style={{background:'#c0fafa', border: 'none', borderRadius:'5px', }} 
                                    className='m-auto'
                                    onClick={()=>{
                                      setBAddNewProperty(false)
                                      setNewProperty({})
                                    }}
                                  >❌</button>}
              </div>
            </div>          
          </div>
        }
        { 
          modeView ==='CONSOLE' &&            
            <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0',  verticalAlign: "top",height:"700px"}}>
              <Console data_objects={props.data_objects} 
                set_data_objects={props.set_data_objects} 
              />
            </div>
        }
        {/* {JSON.stringify(props.data_objects)} */}
      </div>
    )
}

export default ObjectJson;