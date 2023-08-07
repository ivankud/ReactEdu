import getStyle from "./Generator_getStyle"

export default function getTable(render_object){
 if(Object.hasOwn(render_object,'model')){
    return `<table   
                id="${render_object.id??''}"
                style={${getStyle(render_object)}}
            >
                <tr>
                    {${render_object['model'].map((itemModel, index)=>`<th>{${itemModel.name}}</th>`)}}
                </tr>            
                <tr>
                    {${render_object['model'].map((itemModel, index)=>`<th>row1.{${itemModel.field}}</th>`)}}
                </tr>          
                <tr>                                        
                    {${render_object['model'].map((itemModel, index)=>`<th>row2.{${itemModel.field}}</th>`)}|
                </tr>        
                <tr>
                <td></td>
                <td></td>
                </tr>
            </table>`
}
else 
    return `<table   
                id="${render_object.id??''}"
                style={${getStyle(render_object)}}
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
            </table>`
}

