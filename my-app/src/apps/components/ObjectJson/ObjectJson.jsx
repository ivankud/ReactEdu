
import React, {useState, useEffect} from 'react';

// import styles from './ObjectJson.module.css';

// import data_objects from '../../main_designer/sheets/Page1/jsobject';

import ObjectProperty from '../ObjectProperty';
import Console from '../Console';

import { Button } from 'reactstrap';

const ObjectJson = (props)=> {
    // const[object, setObject] = useState(props.data_objects)
    const[modeView, setModeView] = useState('TREE')
    const setProperty =(nameProperty, value)=>{
      let vObject = JSON.parse(JSON.stringify(props.data_objects))
      vObject[nameProperty] = JSON.parse(value);
      console.log('setProperty')
      props.set_data_objects(JSON.stringify(vObject))
      props.changeMessageConsole(`Изменено значение тега "${nameProperty}" на знчение >>${value.replace(/\\/gm,'')}`)
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
          Object.keys(props.data_objects).map((_,index) => 
          {            
            let a = {};
            a[Object.keys(props.data_objects)[index]] = props.data_objects[Object.keys(props.data_objects)[index]]
            return Object.keys(props.data_objects)[index]!=='block'&&<ObjectProperty
                        block={props.data_objects['block']}
                        property={a}
                        setProperty={setProperty}
                    />
          })
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