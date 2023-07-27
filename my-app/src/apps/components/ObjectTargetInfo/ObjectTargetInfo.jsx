
import React from 'react';

import styles from './ObjectTargetInfo.module.css';
import { Input } from 'reactstrap';

const ObjectTargetInfo = (props)=> {
    return (
      <div>
        <div className={styles['Target_path']}>Путь к объекту: {props.targetPath??''}</div>
        <Input value={props.targetPath} onChange={(event)=>{props.changeTargetId(event.target.value)}}/>
        <div className={styles['Target_id']}>Выбранный объект: {props.targetId??''}</div>
      </div>
    )
}

export default ObjectTargetInfo;