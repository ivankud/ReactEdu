import { ContentGenerator } from "../components";

export function getChildrenArray (children){
    console.log("getChildrenArray->>")
    if(Object.hasOwn(children,'children')){
        return children.children;
    }
    return [];
}

export default function getChildren (children){
    if(Object.hasOwn(children,'children')){
        return children.children.map(item=>ContentGenerator(item)).join('')
    }
    return '';
}