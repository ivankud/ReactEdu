import getStyle from "./Generator_getStyle"

export default function getInput(render_object){
return `<input
    id="${render_object.id??''}"
    style={${getStyle(render_object)}}
    placeholder={'${render_object.content??''}'}
    defaultValue={'${render_object.content??''}'}
    ${render_object.onChange?`onChange={${render_object.onChange}}`:''}
    value={this.state.${render_object.value}}
/>`
}

