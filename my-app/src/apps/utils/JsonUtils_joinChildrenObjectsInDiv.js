import onlyUnique from "./Array_onlyUnique";
import { getPathById } from "./JsonUtils_getPathById";
import { getElementById } from "./JsonUtils_getElementById";



export function joinChildrenObjectsInDiv(globalObject, heap){
    console.log('globalObject->>',globalObject)
    console.log('heap->>',heap)
/*
функция объединяет объекты в один div Объект в теге children
размеры div компонента высчитываются относительно левых, правых, нижних и верхних границ кучи
1. сначала проверяется возможность объединения 
2. в случае возможности
2.1. высчитвается размеры 
2.2. объединяются с корректировкой позиции
2.3. иначе ошибка
*/
// "id": "des-Div_213123123123123123",
    let newGlobalobject = {
        "tag": "div",
        "id": "Div",
        "style": {
            "width": "0px",
            "height": "0px",
            "border-color": "pink",
            "borderStyle": "solid",
            "borderWidth": "1px",
            "position": "absolute",
            "left": "0px",
            "top": "0px"
        },
        "content": "Контейнер"
    };
    let vHeap = heap.filter(onlyUnique)
    let checkJoinHeap = true;
    if (vHeap.length === 0) checkJoinHeap = false;
    let vNewChildren = []
    let vPath = getPathById(globalObject, vHeap[0]).split('>').slice(0,-1).join('>');
    vHeap.forEach(elem=>{
      if (vPath !== getPathById(globalObject, elem).split('>').slice(0,-1).join('>')) {
        checkJoinHeap = false;
      };
    })
    let vElem = getElementById(globalObject, heap[0]);
    let x_left =    Number(vElem.style.left.replace('px','')),
        x_right =   Number(vElem.style.left.replace('px',''))+Number(vElem.style.width.replace('px','')),
        y_top =     Number(vElem.style.top.replace('px','')),
        y_bottom =  Number(vElem.style.top.replace('px',''))+Number(vElem.style.height.replace('px',''));
    if (checkJoinHeap){
        newGlobalobject.children = [];
        let vX_left , vX_right , vY_top , vY_bottom ;
        vHeap.forEach(vID=>{
            vElem = getElementById(globalObject, vID);
            vX_left =    Number(vElem.style.left.replace('px',''));
            vX_right =   Number(vElem.style.left.replace('px',''))+Number(vElem.style.width.replace('px',''));
            vY_top =     Number(vElem.style.top.replace('px',''));
            vY_bottom =  Number(vElem.style.top.replace('px',''))+Number(vElem.style.height.replace('px',''));
            if (x_left > vX_left)       x_left = vX_left ;
            if (y_top > vY_top)         y_top  = vY_top ;
            if (x_right < vX_right)     x_right = vX_right ;
            if (y_bottom < vY_bottom)   y_bottom  = vY_bottom ;
            newGlobalobject.children.push(getElementById(globalObject, vID));
            // console.log("vElem",vElem)
            // console.log("x_right",vX_right)
            // console.log("x_left",vX_left)
            // console.log("y_top",vY_top)
            // console.log("y_bottom",vY_bottom)
        })
        // console.log("result")
        // console.log("x_right",x_right)
        // console.log("x_left",x_left)
        // console.log("y_top",y_top)
        // console.log("y_bottom",y_bottom)
        // console.log('newGlobalobject->>',newGlobalobject)
        let newChildren = []
        newGlobalobject.children.forEach(child=>{
            let vChild = JSON.parse(JSON.stringify(child))
            /*Корректировка координат*/
            vChild.style["left"] = (Number(vChild.style["left"].replace('px','')) - x_left)+"px";
            vChild.style["top"]  = (Number(vChild.style["top"].replace('px','')) - y_top)+"px";
            newChildren.push(vChild)
        })
        // console.log(3) 
        newGlobalobject.children = JSON.parse(JSON.stringify(newChildren))            
        newGlobalobject.style["left"]   = Math.floor(x_left)+'px';
        newGlobalobject.style["top"]    = Math.floor(y_top)+'px';
        newGlobalobject.style["width"]  = Math.floor(x_right - x_left)+'px';
        newGlobalobject.style["height"] = Math.floor(y_bottom - y_top)+'px';     
        return newGlobalobject;
    }
    return null;
}