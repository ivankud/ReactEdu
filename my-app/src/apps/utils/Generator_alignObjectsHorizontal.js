import { getChildrenArray } from "./Generator_getChildren";
export default function alignObjectsHorizontal(render_objects){
    if(render_objects){
        console.log('render_objects->>',render_objects)
        let func = getChildrenArray;           
        console.log(func)
        let childs = func(render_objects) /*получаем потомков верхнего уровня нашего объекта*/
        let style = render_objects.style;
        console.log('childs->',childs)
        let reg = new RegExp("[0-9]*")
        childs.forEach(element => {            
            switch (render_objects.style.height.replace(reg,"")) {
                case "px" :
                    let center = Number(style.height.replace('px',""))/2;
                    console.log('center->',center)
                    console.log("main object height \"px\"");
                    switch (element.style.height.replace(reg,"")) {
                        case "px":
                            console.log("inner object height \"px\"");
                            element.style.top = (center - Number(element.style.height.replace('px',""))/2) + "px";
                            break;
                        case "%":
                            console.log("inner object height \"%\"");
                            element.style.top = (center - (style.height.replace('px',"")*(Number(element.style.height.replace('%',""))/100))/2) + "px";
                            break;
                        default:   
                            console.log("inner object height \"default\"");
                            console.log("#TODO_0002");                            
                            break;
                    }
                    console.log('element.style->>',element.style)
                    break;
                case "%":
                    console.log("main object height \"%\"");
                    break;                
                default:   
                    console.log("main object height \"default\"");
                    break;
            }
            // element.style.top  
            //   element.style.top = center - element.style.height;
            // });
            console.log('childs 2->',childs)
        })
    }
} 


