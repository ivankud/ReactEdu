import {React} from 'react'

// import styles from './Content.module.css'

// import { Button } from 'bootstrap';

// const RenderContent=(render_object,changeSelectedID)=>{


const getChildren = (children,changeSelectedID, targetId,selectedElems,selectionFrameSize,mouseMode,addNewChildOnElement,setOverTargetID)=>{
    if(Object.hasOwn(children,'children')){
        return children.children.map(item=><Content 
                                                data_objects={item}
                                                changeTargetId={changeSelectedID}
                                                targetId={targetId}
                                                selectedElems={selectedElems}
                                                selectionFrameSize={selectionFrameSize}
                                                mouseMode={mouseMode}
                                                addNewChildOnElement={addNewChildOnElement}
                                                setOverTargetID={setOverTargetID}
                                            />)
    }
    return ``;
}

const getStyle = (object, selectedElem, selectedElems)=>{
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
    const RenderContent=(render_object,changeSelectedID,selectionFrameSize)=>{
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
                                onMouseOver={(event)=>{
                                    event.stopPropagation();
                                    // console.log('onMouseOver for', render_object.id , "tag", String(render_object.tag).toLowerCase())
                                    if(props.mouseMode==='MOVENEWITEM'){console.log('MOVENEWITEM for', render_object.id)}
                                    props.setOverTargetID(render_object.id)
                                }}
                                onMouseUp={(event)=>{
                                    // event.stopPropagation();
                                    console.log('onMouseUp')
                                    if(props.mouseMode ==='MOVENEWITEM') props.addNewChildOnElement(event)
                                }}
                            >
                                {render_object.content??``}
                                {getChildren(render_object,changeSelectedID,props.targetId,props.selectedElems,selectionFrameSize,props.mouseMode,props.addNewChildOnElement,props.setOverTargetID)}
                            </div>
                    break;
                case 'button':
                    elem =  <button 
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
                                {getChildren(render_object,changeSelectedID,props.targetId,props.selectedElems,selectionFrameSize,props.mouseMode,props.addNewChildOnElement,props.setOverTargetID)}
                            </button>
                    break;
                default:
                    break;
            }
        }        
        return elem;
    }
    let elem = RenderContent(props.data_objects,props.changeTargetId,props.selectionFrameSize)
    let style
    if(props.data_objects.id===props.targetId)
        style={
            position:"absolute",
            borderStyle:"solid", 
            borderColor:"#ff0000 ",
            borderWidth:"1px ",
            top: props.data_objects.style.top,
            left: props.data_objects.style.left,
            width: props.selectionFrameSize.width,
            height: props.selectionFrameSize.height
        }
    return (
        <div>
            {   props.data_objects.id===props.targetId && 
                <div style={style}/>
            }
            {elem}
        </div>
    )
}



// const getElementIdByClick=(event)=>{
    // console.log(event.target.id);
// }

export default Content;