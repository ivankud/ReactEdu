import {React} from 'react'

// import styles from './Content.module.css'

// import { Button } from 'bootstrap';

// const RenderContent=(render_object,changeSelectedID)=>{


const getChildren = (children,changeSelectedID, targetId,selectedElems)=>{
    if(Object.hasOwn(children,'children')){
        return children.children.map(item=><Content data_objects={item} changeTargetId={changeSelectedID} targetId={targetId} selectedElems={selectedElems}/>)
    }
    return ``;
}

const getStyle = (object, selectedElem, selectedElems)=>{
    console.log('selectedElems',selectedElems)
    let style={};
    if(Object.hasOwn(object,'style')){
        Object.keys(object.style).forEach(styleprop => {
            style[styleprop] = object.style[styleprop];
            style["opacity"]='0.9'
        });
    }
    if(selectedElem || selectedElems?.includes(object.id) ) {
        style['borderStyle']='solid' 
        style['borderColor']='#ff7a7a' 
        style['borderWidth']='1px' 
    }
    else {
        style['borderStyle']='solid' 
        style['borderColor']='#ffffff' 
        style['borderWidth']='1px' 
        
    }
    return style;
}

const checkObject=(obj)=>{
    let check = true;
    if(!Object.hasOwn(obj,'tag'))   {console.log('Ошибка обработки: отсутствует атрибут "tag"'); check= false;}
    if(!Object.hasOwn(obj,'id'))    {console.log('Ошибка обработки: отсутствует атрибут "id"'); check= false;}
    return check;
}



const Content = (props) =>{
    const RenderContent=(render_object,changeSelectedID)=>{
        let elem;
        let style = getStyle(render_object, render_object.id===props.targetId, props.selectedElems)
        if(checkObject){
            switch(String(render_object.tag).toLowerCase()) {
                case 'div': 
                    elem = <div 
                                id = {render_object.id}
                                // key = {render_object.id}
                                key = {Math.floor(Math.random() * 2000)}
                                style={style}
                                onClick={(event)=>{
                                    event.stopPropagation();
                                    changeSelectedID(event.target.id,event.currentTarget)
                                }}
                            >
                                {render_object.content??``}
                                {getChildren(render_object,changeSelectedID,props.targetId,props.selectedElems)}
                            </div>
                    break;
                case 'button':
                    elem = <button 
                            id = {render_object.id}
                            // key = {render_object.id}
                            key = {Math.floor(Math.random() * 2000)}
                            style={style}
                            onClick={(event)=>{
                                event.stopPropagation();
                                changeSelectedID(event.target.id,event.currentTarget)
                            }}
                        >
                            {render_object.content??``}
                            {getChildren(render_object,changeSelectedID,props.targetId,props.selectedElems)}
                        </button>
                    break;
                default:
                    break;
            }
        }
        return elem;
    }
    let elem = RenderContent(props.data_objects,props.changeTargetId)
    return (
        <div>
            {elem}
        </div>
    )
}



// const getElementIdByClick=(event)=>{
    // console.log(event.target.id);
// }

export default Content;