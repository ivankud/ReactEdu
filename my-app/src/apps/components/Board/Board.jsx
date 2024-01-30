import React from "react";
import styles from './Board.module.css'
// import BoardGrid from  './../BoardGrid'
import {Content, BoardGrid} from './../';

const Board = (props) => {
    // let arr = Array(2).fill(Array(2).fill(0));
    const changeTargetId= props.changeTargetId;
    let arr = props.grid;
    const width = 1920;
    const height = 1080;


    const onKeyDownElem = (event)=>{    
        console.log('onKeyDownElem_123123')
    }
    const onDoubleClick = (event)=>{
        console.log('onDoubleClick_123123')
    }
    
    const vElem = <div
        id="123_test"
        style={{width: "40px", opacity: "0.9", height: "40px", borderColor: "rgb(221, 19, 19)", borderStyle: "solid", borderWidth: "1px", position: "absolute", left: "456.438px", top: "239px"}}
        onKeyDown={(event)=>{
            console.log('1111111111111111111111111');
            // document.getElementById("123_test").blur();
            // event.stopPropagation();
        }}
        onMouseOver={(event) => {
            console.log('p>>onMouseOver')
        // event.stopPropagation();
        }}
        onDoubleClick={(event) => {
            document.getElementById("123_test").focus();
            // event.stopPropagation();
            console.log('p>>onDoubleClick')
        }}   
        >
    </div>

    return (
        <div style={{
            border: "solid",
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
                    setSelectedElems={props.setSelectedElems}
                    selectionFrameSize={props.selectionFrameSize}
                    mouseMode={props.mouseMode}
                    addNewChildOnElement={props.addNewChildOnElement}
                    setOverTargetID={props.setOverTargetID}
                    changeTemplateJSON={props.changeTemplateJSON}
                    changeTargetAddIdOnHeap={props.changeTargetAddIdOnHeap}
                />
                {/* <FrameObject/> */}
                
                {vElem}
            </div>
        </div>
    )
}


export default Board;