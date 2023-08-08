
import React, {useState, useEffect} from 'react';

import styles from './SwaggerAPITreeNode.module.css';
import { Button } from 'reactstrap';

const SwaggerAPITreeNode = (props)=> {
  console.log(props.apiName)
    const [showField, setShowField] = useState(false)
    const [addStyle, setAddStyle] = useState('notSelectedItem')
    console.log(props.data_objects)
    return (
      <div>
        <div  style={{display:'flex'}}>
          <button 
              style={{flex:1, borderStyle:"solid", borderColor:`${props.data_objects?.id===props.targetId?"#3dd5f3":"#ffffff"}`,  textAlign:'center', lineHeight:"10px", borderRadius: '5px', appearance: "none", height:'25px', display:'flex'}}
              className={props.selectedAPI['title']===props.apiName?'selectedItem':styles[addStyle]}   
              onClick={()=>{props.setSelectedModel(props.data_objects)}}         
              >
            <button style={{border:'none', background:'none'}} className='mr-0 align-self-center' onClick={()=>{setShowField(!showField)}}>+</button>            
            <div className='m-auto'>{props.apiName}</div>            
          </button>
        </div>
        {showField&&Object.keys(props.data_objects['properties']).map((field, index)=><div style={{backgroundColor:'#ffffff', borderColor:'#a7a7a7f',borderStyle:'solid', borderWidth:'1px'}}>
          <div style={{fontFamily: "monospace"}}>{`${(String(index+1)+'.').padEnd(3,' ')}${field}:${props.data_objects['properties'][field]['type']}:${props.data_objects['properties'][field]['description']}`}</div>
        </div>)}       
      </div>
    )
}

export default SwaggerAPITreeNode;