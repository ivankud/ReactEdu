import getChildren from "./Generator_getChildren"
import getStyle from "./Generator_getStyle"

export default function getDiv(render_object){
return `<div 
    id="${render_object.id??''}"
    style={${getStyle(render_object)}}
>${render_object.content??``}
${getChildren(render_object)}
</div>`
}