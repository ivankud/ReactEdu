
import React, {useState, useEffect} from 'react';

import styles from './ObjectTreeNode.module.css';
import { Button } from 'reactstrap';

const ObjectTreeNode = (props)=> {
    const [showChildren, setShowChildren] = useState(props.show)
    const [addStyle, setAddStyle] = useState('notSelectedItem')
    useEffect(()=>{setShowChildren(props.show)},[props.show])
    useEffect(()=>{},[showChildren,addStyle])
    return (
      <div className=''>
        <div style={{display:'flex'}}>
          <button 
            style={{border:'none', background:'none', width:`${(props.counter+1)*20}px`}} 
            onClick={
                ()=>{
                  // console.log('props.counter>>',props.counter)
                  let vShowChildren = !showChildren;
                  setShowChildren(vShowChildren)
                }}>
              {Object.hasOwn(props.data_objects,"children")?(showChildren?'╚':'+'):' '}
          </button> 
          <button 
            style={{flex:1, borderStyle:"solid", borderColor:`${props.data_objects?.id===props.targetId?"#3dd5f3":"#ffffff"}`,  textAlign:'center', lineHeight:"10px", borderRadius: '5px', appearance: "none"}}
            className={styles[addStyle]}
            onClick={()=>{
              props.changeTargetId(props.data_objects?.id,document.getElementById(props.data_objects?.id))
            }}
            onMouseOver={()=>{
              setAddStyle('selectedItem')
            }}
            onMouseLeave={()=>{
              setAddStyle('notSelectedItem')
            }}
            >
            Тип: {props.data_objects?.id} {props.data_objects?.id&&`->`} id: {props.data_objects?.tag} 
            {/* {props.data_objects.content?`->${props.data_objects.content}`:''} */}
          </button>
        </div>
        {Object.hasOwn(props.data_objects,"children")&&showChildren&& 
          props.data_objects["children"].map(item=>item&&<ObjectTreeNode data_objects={item} counter={props.counter+1} show={showChildren} changeTargetId={props.changeTargetId} targetId={props.targetId}/>)
        }
      </div>
    )
}

export default ObjectTreeNode;