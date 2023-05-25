import React from "react";
import './Board.css'
import BoardGrid from  './../BoardGrid'

const Board = () => {
    let arr = Array(50).fill(Array(50).fill(0));
    const width = 1000;
    const height = 1000;
    return (
        <div className='main_board'
        style={{
            width: width||"px",
            height: height||"px",
        }}
        >
            {arr.map((item, indexI) => {
                return item.map((item1, indexJ)=> {return BoardGrid(indexJ*20,indexI*20)});
            })}
        </div>
    )
}


export default Board;