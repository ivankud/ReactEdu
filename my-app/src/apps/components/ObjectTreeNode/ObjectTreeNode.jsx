
import React, {useState, useEffect} from 'react';

import styles from './ObjectTreeNode.module.css';
import { Button } from 'reactstrap';

const ObjectTreeNode = (props)=> {
    const [showChildren, setShowChildren] = useState(props.show)
    useEffect(()=>{setShowChildren(props.show)},[props.show])
    useEffect(()=>{},[showChildren])
    return (
      <div className=''>
        <div style={{display:'flex'}}>
          <button 
            style={{border:'none', background:'none', width:`${(props.counter+1)*20}px`}} 
            onClick={
                ()=>{
                  console.log('props.counter>>',props.counter)
                  let vShowChildren = !showChildren;
                  setShowChildren(vShowChildren)
                }}>
              {Object.hasOwn(props.data_objects,"children")?(showChildren?'-':'+'):' '}
          </button>
          <Button 
            style={{flex:1, backgroundColor:'#b3b3cc'}}
            onClick={()=>{
              props.changeTargetId(props.data_objects?.id,document.getElementById(props.data_objects?.id))
            }}
            >
            {props.data_objects?.tag}:{props.data_objects?.id}
          </Button>
        </div>
        {Object.hasOwn(props.data_objects,"children")&&showChildren&& 
          props.data_objects["children"].map(item=>item&&<ObjectTreeNode data_objects={item} counter={props.counter+1} show={showChildren} changeTargetId={props.changeTargetId}/>)
        }
      </div>
    )
}

export default ObjectTreeNode;