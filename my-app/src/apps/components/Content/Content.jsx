import {React} from 'react'

import styles from './Content.module.css'



const RenderContent=(render_object)=>{
    // return ``;
    // console.log(Object.hasOwn(render_object,'tag'))
    let elem;
    let style = getStyle(render_object)
    if(checkObject){
        if(render_object.tag === 'div') elem = 
            <div 
                id = {render_object.id}
                key = {render_object.id}
                style={style}
                onClick={(event)=>{
                    console.log(event)
                    console.log("id:", event.target.id)
                    // getElementIdByClick(getElementIdByClick)
                }}
            >
                {render_object.content??``}
                {getChildren(render_object)}
            </div>
    }
    return elem;
}

const getChildren = (children)=>{
    // children.map(item=><Content data_objects={children}/>)
    if(Object.hasOwn(children,'children')){
        return children.children.map(item=><Content data_objects={item}/>)
    }
    return ``;
}

const getStyle = (styleproperties)=>{
    let style={};
    if(Object.hasOwn(styleproperties,'style')){
        Object.keys(styleproperties.style).forEach(styleprop => {
            style[styleprop] = styleproperties.style[styleprop];
            style["opacity"]='0.8'
        });
    }
    // console.log(style)
    return style;
}

const checkObject=(obj)=>{
    let check = true;
    if(!Object.hasOwn(obj,'tag'))   {console.log('Ошибка обработки: отсутствует атрибут "tag"'); check= false;}
    if(!Object.hasOwn(obj,'id'))    {console.log('Ошибка обработки: отсутствует атрибут "id"'); check= false;}
    return check;
}

const Content = (props) =>{
    let data_objects = props.data_objects;
    return (
        <div>
            {RenderContent(data_objects)}
        </div>
    )
}

const getElementIdByClick=(event)=>{
    console.log(event.target.id);
}

export default Content;