import React from "react";
import styles from './Board.module.css'
// import BoardGrid from  './../BoardGrid'
import {Content,BoardGrid} from './../';

const Board = (props) => {
    // let arr = Array(2).fill(Array(2).fill(0));
    const changeTargetId= props.changeTargetId;
    let arr = props.grid;
    const width = 700;
    const height = 700;
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
                {arr.map((item, indexI) => item.map((item1, indexJ)=> BoardGrid(indexJ*20,indexI*20)))}
                <Content 
                    data_objects={props.data_objects} 
                    changeTargetId={changeTargetId} 
                    targetId={props.targetId} 
                    selectedElems={props.selectedElems} 
                    selectionFrameSize={props.selectionFrameSize}
                    mouseMode={props.mouseMode}
                    addNewChildOnElement={props.addNewChildOnElement}
                    setOverTargetID={props.setOverTargetID}
                />
                {/* <FrameObject/> */}
            </div>
        </div>
    )
}


export default Board;