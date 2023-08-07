import getChildren from "./Generator_getChildren"
import getStyle from "./Generator_getStyle"

export default function getButton(render_object){
return `<button 
    id="${render_object.id??''}"
    key = "${render_object.id}"
    style={${getStyle(render_object)}}
    ${render_object.onClick?`onClick={${render_object.onClick}}`:''}
>${render_object.content??``}
${getChildren(render_object)}
</button>`
}