import React from "react";
// import styles from './BoardGrid.css'

const BoardGrid = (positionX, positionY) =>{
    // debugger;
    return(
        <div>
            <div style ={{
                position: 'absolute',
                left: (positionX??'0')||'px',
                top:  (positionY??'0')||'px',
            }}>
                .
            </div>
        </div>
    )
}

export default BoardGrid