import React
, {useState, useEffect}
 from 'react';

// import {Object} from './../../../components';

import {
  // ObjectJson,
  Button
} from '../../../components';

import styles from './Page2.module.css';
import { updateObject } from '../../../utils';

  const Page2 = () => {

    const [style, setStyle] = useState({
                                        color: "white",
                                        backgroundColor: "DodgerBlue",
                                        padding: "10px",
                                        position: "absolute",
                                        fontFamily: "Arial",
                                        left:"200px",
                                        top:"200px",
                                      })
    const [originalStyle, setOriginalStyle] = useState({
                                        color: "white",
                                        backgroundColor: "DodgerBlue",
                                        padding: "10px",
                                        position: "absolute",
                                        fontFamily: "Arial",
                                      })
    const changeStyle =(newStyle)=>{
      let vstyle = JSON.parse(JSON.stringify(style));
      var finalStyle={};
      for(let _obj in style) finalStyle[_obj ]=style[_obj];
      console.log('oldStyle', finalStyle);
      for(let _obj in newStyle) finalStyle[_obj ]=newStyle[_obj];
      console.log('newStyle', finalStyle);
      setStyle(finalStyle)
    }
    
    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
        console.log('dragMouseDown')
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        console.log('elementDrag event', e)
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.pageX;
        pos2 = pos4 - e.pageY;
        pos3 = e.pageX;
        pos4 = e.pageY;
        // set the element's new position:
        let vStyle = {}
        vStyle.top = pos4 + "px";
        vStyle.left = pos3 + "px";
        console.log('elementDrag vStyle',vStyle)
        changeStyle(vStyle)
        // style.top = (elmnt.offsetTop - pos2) + "px";
        // style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        setStyle(originalStyle)
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    
    useEffect(()=>{
      let elem = document.getElementById("mydiv");
      console.log(elem)
      dragElement(elem);
    })
    
    
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };
    return (        
        <div>
          {JSON.stringify(style)}
          <div id="mydiv" style={style}>
            <div id="mydivheader">Click here to move</div>
            <p>Move</p>
            <p>this</p>
            <p>DIV</p>
          </div>
        </div>
    )
  }

  export default Page2;