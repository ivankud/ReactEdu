import getStyle from "./Generator_getStyle"

import {TableText} from "../components/Table";

// "../Table";

function getTableFromTableText(render_object){
    let elem ;
    let style = getStyle(render_object);
    // if (Object.hasOwn(render_object, "model")) {
        elem = //'<div>ssssssssssssssssssss</div>'
        // (
        //   <div
        //     tabIndex={33}
        //     className="ag-theme-alpine"
        //     id={render_object.id}
        //     style={style}
        //     onDoubleClick={(event) => {
        //       console.log("div0");
        //     }}
        //   >
            //  <div
            //   style={{
            //     pointerEvents: "none",
            //     width: style.width,
            //     height: style.height,
            //     position: "absolute",
            //     top: "0px",
            //     left: "0px",
            //     "z-index": 33,
            //   }}
            // >
            //   {
                 TableText(render_object)
            // }
        //     </div>
        //   </div>
        // )
        ;
    //   } else
        // elem = (
        //   <div
        //     tabIndex={0}
        //     className="ag-theme-alpine"
        //     id={render_object.id}
        //     style={style}
        //   >
        //     <div
        //       style={{
        //         width: style.width,
        //         height: style.height,
        //         position: "absolute",
        //         top: "0px",
        //         left: "0px",
        //       }}
        //     >
            //   {Table(render_object)}
        //     </div>
        //   </div>
        // );
        return elem;
}
   
 function getTableJustTable/*TRTH*/(render_object){
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

const getTable = getTableFromTableText;
// let getTable = getTableJustTable;

export default getTable;