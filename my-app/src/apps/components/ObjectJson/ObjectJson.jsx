
import React, {useState} from 'react';

import styles from './ObjectJson.module.css';

import data_objects from '../../main_designer/sheets/Page1/jsobject';

import ObjectProperty from '../ObjectProperty';
import Console from '../Console';

import { Button } from 'reactstrap';

const ObjectJson = (props)=> {
    const[object, setObject] = useState(props.data_objects)
    const[modeView, setModeView] = useState('TREE')
    const setProperty =(nameProperty, value)=>{
      // console.log('setProperty value>>',value)
      // console.log('setProperty typeof value>>',typeof value)
      let vObject = JSON.parse(JSON.stringify(props.data_objects))
      // console.log(JSON.parse(value))
      vObject[nameProperty] = JSON.parse(value);
      // console.log(vObject)
      setObject(vObject) 
      props.set_data_objects(JSON.stringify(vObject))
    }
    if(props.data_objects)
    return (
      <div>
        <div>
          <Button 
            onClick={
              ()=>setModeView('TREE')
            }
            className={modeView==='TREE'?'btn-info disabled':'btn-info active'}
          >Свойства</Button>
          <Button 
            onClick={
              ()=>setModeView('CONSOLE')
            }
            className={modeView==='CONSOLE'?'btn-info disabled':'btn-info active'}
          >Json</Button>
        </div>
        { 
          modeView ==='TREE' &&  
          Object.keys(props.data_objects).map((_,index) => {            
            let a = {};
            a[Object.keys(props.data_objects)[index]] = props.data_objects[Object.keys(props.data_objects)[index]]
            return <ObjectProperty
                        property={a}
                        setProperty={setProperty}
                    />
          })
        }
        { 
          modeView ==='CONSOLE' &&            
            <div style={{display: "inline-block", padding:'0px', backgroundColor:'#FFFFE0', height:'100vh', verticalAlign: "top"}}>
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