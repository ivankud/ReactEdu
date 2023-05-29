import React from 'react';
import styles from './FrameObject.module.css';

const FrameObject = () => {
    return (
        <div 
            id='333'
            className ={styles['main_frame_div']}
            style={{
                width:"300px",
                height:"300px",
            }}
            onMouseDown={(e)=>{console.log('DIV1')}}
        >
            123123
            123123
            123123
            123123
            123123
            123123
            123123
            123123
            123123
            <div 
            id='4444'
            className ={styles['main_frame_div']}
            style={{
                width:"300px",
                height:"300px",
            }}
            onMouseDown={(e)=>{console.log('DIV2')}}
        >
            123123
        </div>
        </div>
    )
}

export default FrameObject;