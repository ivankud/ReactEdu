import React from "react";
// import styles from './BoardGrid.css'

const BoardGrid = (positionX, positionY) =>{
    let x = (positionX??0);
    let y = (positionY??0);
    // debugger;    
    return(
        <div
            key={positionX*100000000000+positionY*1000}
            style ={{
                position: 'absolute',
                top: `${x}px`,
                left: `${y}px`,
            }}>
                .
        </div>
    )
}

export default BoardGrid