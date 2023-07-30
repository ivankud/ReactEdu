
import React from 'react';

import styles from './ObjectTargetInfo.module.css';
import { Input } from 'reactstrap';

const ObjectTargetInfo = (props)=> {
    return (
      <div>
        <div className={styles['Target_path']}>Выбранный объект: {props.targetId??''}</div>
        <div className={styles['Target_id']}>Путь к объекту: {props.targetPath??''}</div>
        <Input value={props.targetId} onChange={(event)=>{props.changeTargetId(event.target.value)}}/>
      </div>
    )
}

export default ObjectTargetInfo;