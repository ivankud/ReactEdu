import { getChildrenArray } from "./Generator_getChildren";
export default function alignObjectsVertical(render_objects){
    if(render_objects){
        console.log('render_objects->>',render_objects)
        let func = getChildrenArray;           
        console.log(func)
        let childs = func(render_objects) /*получаем потомков верхнего уровня нашего объекта*/
        let style = render_objects.style;
        console.log('childs->',childs)
        let reg = new RegExp("[0-9]*")
        childs.forEach(element => {            
            switch (render_objects.style.width.replace(reg,"")) {
                case "px" :
                    let center = Number(style.width.replace('px',""))/2;
                    console.log('center->',center)
                    console.log("main object width \"px\"");
                    switch (element.style.width.replace(reg,"")) {
                        case "px":
                            console.log("inner object width \"px\"");
                            element.style.left = (center - Number(element.style.width.replace('px',""))/2) + "px";
                            break;
                        case "%":
                            console.log("inner object width \"%\"");
                            element.style.left = (center - (style.width.replace('px',"")*(Number(element.style.width.replace('%',""))/100))/2) + "px";
                            break;
                        default:   
                            console.log("inner object width \"default\"");
                            console.log("#TODO_0001");                            
                            break;
                    }
                    console.log('element.style->>',element.style)
                    break;
                case "%":
                    console.log("main object width \"%\"");
                    break;                
                default:   
                    console.log("main object width \"default\"");
                    break;
            }
            // element.style.left  
            //   element.style.left = center - element.style.width;
            // });
            console.log('childs 2->',childs)
        })
    }
} 



