import getChildren from './Generator_getChildren'

import getChildrenArray from './Generator_getChildren'

export default function alignObjectsVertical(render_objects){
    let func = getChildrenArray;           
    let childs = func(render_objects) /*получаем потомков верхнего уровня нашего объекта*/
    console.log('childs->',childs)
    console.log('childs->',typeof childs)
    // childs.forEach(element => {
    //   console.log('element->',element)      
    // });
} 



