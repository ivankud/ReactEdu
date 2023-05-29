import React from "react";
import styles from './Board.module.css'
// import BoardGrid from  './../BoardGrid'
import {FrameObject,BoardGrid} from './../';

const Board = (props) => {
    // let arr = Array(50).fill(Array(50).fill(0));
    let arr = props.grid;
    const width = 1000;
    const height = 1000;
    return (
        <div>
            <div    
                id='just_dot_grid'
                className={styles['main_board']}
                style={{
                    width: width||"px",
                    height: height||"px",
                }}
            >
                {arr.map((item, indexI) => {
                    return item.map((item1, indexJ)=> {return BoardGrid(indexJ*20,indexI*20)});
                })}
                <FrameObject/>
            </div>
        </div>
    )
}


export default Board;