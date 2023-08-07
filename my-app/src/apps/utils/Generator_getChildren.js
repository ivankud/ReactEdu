import { ContentGenerator } from "../components";

export default function getChildren (children){
    if(Object.hasOwn(children,'children')){
        return children.children.map(item=>ContentGenerator(item)).join('')
    }
    return '';
}