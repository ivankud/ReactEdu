export default function getStyle(object){
    let style={};
    if(object){
        if(Object.hasOwn(object,'style')){
            Object.keys(object.style).forEach(styleprop => {
                style[styleprop] = object.style[styleprop];
            });
        }
    }
    return JSON.stringify(style);
}