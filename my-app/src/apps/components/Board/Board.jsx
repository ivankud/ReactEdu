import React from "react";
import styles from './Board.module.css'
// import BoardGrid from  './../BoardGrid'
import {Content,BoardGrid} from './../';

const Board = (props) => {
    // let arr = Array(2).fill(Array(2).fill(0));
    let arr = props.grid;
    const width = 1000;
    const height = 1000;
    return (
        <div style={{
            border: "dashed",
            width: width||"px",
            height: height||"px",
        }}>
            <div    
                id='just_dot_grid'
                className={styles.main_board}
                style={{position: "relative",}}
            >
                {arr.map((item, indexI) => {
                    return item.map((item1, indexJ)=> {
                        return BoardGrid(indexJ*20,indexI*20)
                    });
                })}
                <Content data_objects={props.data_objects}/>
                {/* <FrameObject/> */}
            </div>
        </div>
    )
}


export default Board;