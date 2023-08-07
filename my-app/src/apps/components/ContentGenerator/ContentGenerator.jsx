import { 
    getDiv,
    getButton, 
    getInput,
    getLabel,
    getTable,
} from '../../utils';

const checkObject=(obj)=>{
    let check = true;
    if(!Object.hasOwn(obj,'tag'))   {console.log('Ошибка обработки: отсутствует атрибут "tag"'); check= false;}
    if(!Object.hasOwn(obj,'id'))    {console.log('Ошибка обработки: отсутствует атрибут "id"'); check= false;}
    return check;
}


const RenderContent=(render_object)=>{ 
    let elem;
    if(checkObject && render_object){
        switch(String(render_object.tag).toLowerCase()) {
            case 'div': 
                elem = getDiv(render_object)
                break;
            case 'button':
                elem = getButton(render_object)
                break;
            case 'table':
                elem = getTable(render_object)
                break;                
            case 'input':
                elem = getInput(render_object)
                break;
            case 'label':
                elem = getLabel(render_object)
                break;
            default:
                break;
        }
    }        
    return elem;
}


const ContentGenerator = (render_object) =>{
    let elem = RenderContent(render_object)
    return elem
}

export default ContentGenerator;