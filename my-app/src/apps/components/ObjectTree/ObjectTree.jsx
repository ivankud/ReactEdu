
import React from 'react';

import styles from './ObjectTree.module.css';
import {ObjectTreeNode} from '../'

const ObjectTree = (props)=> {
    return (
      <div style={{widht: "400px", height: "400px", backgroundColor: '#c2c2d6', overflow: "scroll",}}>
        <ObjectTreeNode data_objects={props.data_objects} counter={0} show={true} changeTargetId={props.changeTargetId}/>
      </div>
    )
}

export default ObjectTree;