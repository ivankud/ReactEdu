import { getChildrenArray } from "./Generator_getChildren";
export default function alignObjectsFullWidth(render_objects){
    if(render_objects){
        console.log('render_objects->>',render_objects)
        let func = getChildrenArray;           
        console.log(func)
        let childs = func(render_objects) /*получаем потомков верхнего уровня нашего объекта*/
        let style = render_objects.style;
        console.log('childs->',childs)
        let reg = new RegExp("[0-9]*")
        childs.forEach(element => {                        
            element.style.left = "0px";                  
            element.style.width = "100%";
        })
    }
} 



