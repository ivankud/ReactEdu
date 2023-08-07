import getStyle from "./Generator_getStyle"

export default function getLabel(render_object){
return `<p id="${render_object.id??''}"
    style={${getStyle(render_object)}}
>
{${render_object.content??''}}
</p>`
}

