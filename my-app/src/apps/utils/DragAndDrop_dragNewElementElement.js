
  export function dragNewElementElement(elmntId , changeStyle, setMode) {
      let elmnt = document.getElementById(elmntId)
      var /*pos1 = 0, pos2 = 0,*/ pos3 = 0, pos4 = 0;
      if (elmnt) {
        /* if present, the header is where you move the DIV from:*/
        elmnt.onmousedown = dragMouseDown;
      } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
        document.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
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
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        // pos1 = pos3 - e.pageX;
        // pos2 = pos4 - e.pageY;
        pos3 = e.pageX;
        pos4 = e.pageY;
        // set the element's new position:
        let vStyle = {}
        vStyle.top = pos4+2 + "px";
        vStyle.left = pos3+2 + "px";
        changeStyle(vStyle)
        // style.top = (elmnt.offsetTop - pos2) + "px";
        // style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        setMode()
      }
    }