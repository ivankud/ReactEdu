import React from "react";
import styles from './Board.module.css'
// import BoardGrid from  './../BoardGrid'
import {FrameObject,BoardGrid} from './../';

const Board = (props) => {
    let arr = Array(2).fill(Array(2).fill(0));
    // let arr = props.grid;
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
            >
                {/* <div style={{
                    position: "relative",
                    top: "100px",
                    left: "100px",
                    width:'300px',
                    heigth:'300px',
                }}>*</div> */}
                <div style={{
                    position: "relative",
                }}>*</div>
                {/* {arr.map((item, indexI) => {
                    return item.map((item1, indexJ)=> {
                            let x = (indexI??0)*10;
                            let y = (indexJ??0)*10;
                            // let x = "200px";
                            // let x = 200+"px";
                            // let y = "200px";
                            console.log('x->>',`${x}px`, 'y->>',`${y}px`)

                            return  <div style={{
                                position: "sticky",
                                top: "200px",
                                left: "300px",
                            }}>*</div>
                        // BoardGrid(indexJ*20,indexI*20)
                    });
                })} */}
                {/* <FrameObject/> */}
            </div>
        </div>
    )
}


export default Board;