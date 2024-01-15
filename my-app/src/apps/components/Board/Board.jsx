import React from "react";
import styles from './Board.module.css'
// import BoardGrid from  './../BoardGrid'
import {Content,BoardGrid} from './../';

const Board = (props) => {
    // let arr = Array(2).fill(Array(2).fill(0));
    const changeTargetId= props.changeTargetId;
    let arr = props.grid;
    const width = 1920;
    const height = 1080;
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
                {/* {arr.map((item, indexI) => item.map((item1, indexJ)=> BoardGrid(indexJ*20,indexI*20)))} */} {/*временно отключена*/}
                <Content 
                    data_objects={props.data_objects} 
                    changeTargetId={changeTargetId} 
                    targetId={props.targetId} 
                    selectedElems={props.selectedElems} 
                    selectionFrameSize={props.selectionFrameSize}
                    mouseMode={props.mouseMode}
                    addNewChildOnElement={props.addNewChildOnElement}
                    setOverTargetID={props.setOverTargetID}
                    changeTemplateJSON={props.changeTemplateJSON}
                />
                {/* <FrameObject/> */}
            </div>
        </div>
    )
}


export default Board;