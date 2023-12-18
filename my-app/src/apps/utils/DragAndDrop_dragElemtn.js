export function dragElement(elmnt,changeСoordinatesSelectedElem) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      // document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    // } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    // }
  
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
      // console.log('e->>',e)
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      if(Math.abs(pos2) > 10 || Math.abs(pos1) > 10 ){
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        console.log('offsetTop->>',(elmnt.offsetTop - pos2) + "px")
        console.log('offsetLeft->>',(elmnt.offsetLeft - pos1) + "px")
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      changeСoordinatesSelectedElem&&changeСoordinatesSelectedElem({'top':elmnt.style.top, 'left': elmnt.style.left})
    }
  }