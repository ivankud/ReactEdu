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
        >
            123123
        </div>
    )
}

export default FrameObject;