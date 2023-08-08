
import React, { useState } from 'react';

// import styles from './SwaggerAPITreeNode.module.css';
import {SwaggerAPITreeNode} from '../'

const SwaggerAPITree = (props)=> {
    const [selectedAPI,setSelectedAPI] = useState(props.selectedModel)
    const [finderText,setFinderText] = useState('')
    const changeSelectedAPI =(selAPI)=>{
        setSelectedAPI(selAPI)
    }
    return (
      <div>
        <input style={{width:'100%'}} defaultValue={finderText} onChange={event=>{setFinderText(event.currentTarget.value)}}/>
        <div style={{widht: "400px", height: "400px", backgroundColor: '#d1cfcd', overflow: "scroll",}}>
          {Object.keys(props.data_objects['definitions']).map(apiName=>{
            return (JSON.stringify(props.data_objects['definitions'][apiName]).search(finderText)!==-1)&& <SwaggerAPITreeNode setSelectedModel={props.setSelectedModel} apiName={apiName} data_objects={props.data_objects['definitions'][apiName]} counter={0} show={true} selectedAPI={selectedAPI} changeSelectedAPI={changeSelectedAPI}/>
          })}
        </div>
      </div>        
    )
}

export default SwaggerAPITree;