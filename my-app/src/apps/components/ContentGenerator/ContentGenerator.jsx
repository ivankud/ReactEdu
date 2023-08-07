import {React} from 'react'

// import styles from './Content.module.css'

// import { Button } from 'bootstrap';

// const RenderContent=(render_object,changeSelectedID)=>{

import ResizableBox from '../ResizableBox';

const getChildren = (children,changeSelectedID, targetId,selectedElems,selectionFrameSize,mouseMode,addNewChildOnElement,setOverTargetID,changeTemplateJSON)=>{
    if(Object.hasOwn(children,'children')){
        return children.children.map(item=><ContentGenerator 
                                                data_objects={item}
                                                changeTargetId={changeSelectedID}
                                                targetId={targetId}
                                                selectedElems={selectedElems}
                                                selectionFrameSize={selectionFrameSize}
                                                mouseMode={mouseMode}
                                                addNewChildOnElement={addNewChildOnElement}
                                                setOverTargetID={setOverTargetID}
                                                changeTemplateJSON={changeTemplateJSON}
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
    if( selectedElem || selectedElems?.includes(object.id) ) {
        style['borderStyle']=style['borderStyle']??'solid' 
        style['borderColor']=style['borderColor']??'#ff7a7a' 
        style['borderWidth']=style['borderWidth']??'1px' 
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



const ContentGenerator = (props) =>{



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
                            >
                                {/* {render_object.id!=='main_object' ? <button style={{width:"100%",height:"100%", display:"flex"}}
                                                                        onClick={(event)=>{
                                                                            event.stopPropagation();
                                                                            changeSelectedID(event.target.id,event.currentTarget)
                                                                        }}
                                                                    ></button>:render_object.content??``} */}
                                {render_object.content??``}
                                {getChildren(render_object,changeSelectedID,props.targetId,props.selectedElems,selectionFrameSize,props.mouseMode,props.addNewChildOnElement,props.setOverTargetID,props.changeTemplateJSON)}
                            </div>
                    break;
                case 'button':
                    elem =  <button 
                                id = {render_object.id}
                                // key = {render_object.id}
                                key = {Math.floor(Math.random() * 2000)}
                                style={style}
                            >
                                {render_object.content??``}
                                {getChildren(render_object,changeSelectedID,props.targetId,props.selectedElems,selectionFrameSize,props.mouseMode,props.addNewChildOnElement,props.setOverTargetID,props.changeTemplateJSON)}
                            </button>
                    break;
                case 'table':
                    if(Object.hasOwn(render_object,'model')){
                        elem = <table   
                                    id= {render_object.id} 
                                    style={style}
                                >
                                    <tr>
                                        {render_object['model'].map((itemModel, index)=><th>{itemModel.name}</th>)}
                                    </tr>            
                                    <tr>
                                        {render_object['model'].map((itemModel, index)=><th>row1.{itemModel.field}</th>)}
                                    </tr>          
                                    <tr>                                        
                                        {render_object['model'].map((itemModel, index)=><th>row2.{itemModel.field}</th>)}
                                    </tr>        
                                    <tr>
                                    <td></td>
                                    <td></td>
                                    </tr>
                                </table>
                    }
                    else 
                        elem = <table   
                                    id= {render_object.id} 
                                    style={style}
                                >
                                    <tr>
                                        <th colspan="2"></th>
                                    </tr>            
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>        
                                    <tr>
                                    <td></td>
                                    <td></td>
                                    </tr>
                                </table>
                    break;
                    
                case 'input':
                    elem =  <input
                                id= {render_object.id}
                                style={style}
                                placeholder={render_object.content??''}
                                defaultValue={render_object.content??''}
                                onChange={'asdfasdfasdf'}
                                // value={`$RENDER_DEFECT$this.state.${render_object.value}$RENDER_DEFECT$`}
                            />
                    break;
                case 'label':
                    elem =  <p id= {render_object.id}
                                style={style}
                            >
                                {render_object.content??''}
                            </p>
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
            {   
                
                    props.data_objects.id===props.targetId && props.data_objects.id !== 'main_object' && (
                    props.mouseMode==='RESIZE'?<ResizableBox data_objects={props.data_objects} style={style} changeTemplateJSON={props.changeTemplateJSON}/>:
                    // props.mouseMode==='HANDLE'?<div style={style}/>:
                    props.mouseMode==='HANDLE'?<div style={props.data_objects.style}/>:
                    ``
                )
            }
            {elem}
        </div>
    )
}



// const getElementIdByClick=(event)=>{
    // console.log(event.target.id);
// }

export default ContentGenerator;