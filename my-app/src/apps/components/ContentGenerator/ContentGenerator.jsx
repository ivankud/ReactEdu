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
                return getDiv(render_object)
                // break;
            case 'button':
                return getButton(render_object)
                // break;
            case 'table':
                return getTable(render_object)
                // break;                
            case 'input':
                return getInput(render_object)
                // break;
            case 'label':
                return getLabel(render_object)
                // break;
            default:
                break;
        }
    }            
}


const ContentGenerator = (render_object) =>{
    let elem = RenderContent(render_object)
    return elem
}

export default ContentGenerator;