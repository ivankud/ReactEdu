import React from "react";
// import styles from './BoardGrid.css'

const BoardGrid = (positionX, positionY) =>{
    console.log(positionX, positionY)
    // debugger;
    return(
        <div
            style ={{
                dislay: "inline",
                position: 'static',
                left: (positionX??'0')||'px',
                top:  (positionY??'0')||'px',
            }}>
                *
        </div>
    )
}

export default BoardGrid