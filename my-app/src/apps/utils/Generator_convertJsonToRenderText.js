import {ContentGenerator} from '../components'
import ReactDomServer from 'react-dom/server';

import prettyRenderText from './Generator_prettyRenderText';


export default function convertJsonToRenderText(json_value) {
    let precontent =<ContentGenerator 
                        data_objects={json_value} 
                        changeTargetId={null} 
                        targetId={null} 
                        selectedElems={null} 
                        selectionFrameSize={null}
                        mouseMode={null}
                        addNewChildOnElement={null}
                        setOverTargetID={null}
                        changeTemplateJSON={null}
                    />
    console.log('precontent',precontent)
    console.log('precontent json stringify',String(precontent))
    // let content = `${ReactDomServer.renderToStaticMarkup(precontent)}`
    console.log('>>>>>>>>>>>>>>>>>>>>>>>',ReactDomServer.renderToStaticMarkup(<button onClick={()=>{console.log('123123123')}}>1</button>))
    let content = `${ReactDomServer.renderToString(precontent)}`
    console.log('content',content)
    let content2 = content.replaceAll(':',':\'')
                          .replaceAll(';','\';')
                          .replace(/(style\=)(\")([^\s]*)(\")/g,"$1{{\$3\'\}}")
                          .replace(/;/g,",")
                          .replaceAll('border-style','borderStyle')
                          .replaceAll('border-color','borderColor')
                          .replaceAll('border-width','borderWidth')
                          .replaceAll('>','>\n')
                          .replaceAll('&#x27\',','\'')
                            .replaceAll('$RENDER_DEFECT$','')
                          .replaceAll(/\"(this.state.[^"]*)\"/g,"{$1}")
    content2 = prettyRenderText("<div  style={{position:'relative'}}>"+content2+"</div>")
    return content2;
}