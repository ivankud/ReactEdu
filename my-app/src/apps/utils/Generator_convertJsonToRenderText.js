import {ContentGenerator} from '../components'

import prettyRenderText from './Generator_prettyRenderText';


export default function convertJsonToRenderText(json_value) {
    let precontent = ContentGenerator(json_value)
    let content2 = precontent//.replaceAll(':',':\'')
                            // .replaceAll(';',';')
                            // eslint-disable-next-line
                            .replace(/(style\=)(\")([^\s]*)(\")/g,"$1{{\$3\'\}}")
                            .replace(/;([^\s])/g,",$1") 
                            .replaceAll('border-style','borderStyle')
                            .replaceAll('border-color','borderColor')
                            .replaceAll('border-width','borderWidth')
                            .replaceAll('>','>\n')
                            .replaceAll('&#x27\',','\'')
                            .replaceAll('$RENDER_DEFECT$','')
                            // eslint-disable-next-line 
                            // .replaceAll(/\"(this.state.[^"]*)\"/g,"{$1}")
                            .replaceAll(/\n    \n/g,'\n')
    content2 = prettyRenderText(`<div  style={{position:'relative'}}>${content2}</div>`)
    return content2;
}