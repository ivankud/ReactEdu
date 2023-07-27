import {React} from 'react'

// import styles from './Content.module.css'

// import { Button } from 'bootstrap';

// const RenderContent=(render_object,changeSelectedID)=>{


const getChildren = (children,changeSelectedID)=>{
    // children.map(item=><Content data_objects={children}/>)
    if(Object.hasOwn(children,'children')){
        return children.children.map(item=><Content data_objects={item} changeTargetId={changeSelectedID}/>)
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
    // let data_objects = props.data_objects;
    console.log('Content props>>>>',props)
    const RenderContent=(render_object,changeSelectedID)=>{
        // return ``;
        // console.log(Object.hasOwn(render_object,'tag'))
        // console.log('CHECK222',render_object)
        let elem;
        let style = getStyle(render_object)
        if(checkObject){
            switch(String(render_object.tag).toLowerCase()) {
                case 'div': 
                    elem = <div 
                                id = {render_object.id}
                                // key = {render_object.id}
                                key = {Math.floor(Math.random() * 2000)}
                                style={style}
                                onClick={(event)=>{
                                    // console.log(event)
                                    console.log("id:", event.target.id)
                                    changeSelectedID(event.target.id)
                                    // getElementIdByClick(getElementIdByClick)
                                }}
                            >
                                {render_object.content??``}
                                {getChildren(render_object,changeSelectedID)}
                            </div>
                    break;
                case 'button':
                    elem = <button 
                            id = {render_object.id}
                            // key = {render_object.id}
                            key = {Math.floor(Math.random() * 2000)}
                            style={style}
                            onClick={(event)=>{
                                // console.log(event)
                                console.log("id:", event.target.id)
                                changeSelectedID(event.target.id)
                                // event.stopPropagation()
                                // getElementIdByClick(getElementIdByClick)
                            }}
                        >
                            {render_object.content??``}
                            {getChildren(render_object,changeSelectedID)}
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