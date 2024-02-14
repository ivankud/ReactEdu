
import convertJsonToRenderText from './Generator_convertJsonToRenderText';
import getImportByJSON from './Generator_getImportByJSON';
import { objectGetFlatList } from './JsonUtils' //./JsonUtils_objectGetFlatList';
import { objectGetTagsByList } from './JsonUtils.js';
import onlyUnique from './Array_onlyUnique.js';

export default function convertJsonToRenderClass(json_value) {
    let template = `
import React from 'react';

%IMPORTCOMPONENTS%

class %PAGENAME% extends React.Component {
    constructor(props) {
        super(props);
        this.state = %STATEVARIABLES%
    }

    render() {
        return (
            %RENDERTEXT%
    );}
}

export default %PAGENAME%;`

    let result;
    let renderText = convertJsonToRenderText(json_value)
    let stateVariables = {}
    json_value['context'].forEach(stateItem=>stateVariables[Object.keys(stateItem)[0]] = stateItem[Object.keys(stateItem)[0]])
    const importComponentsList = [];
    let importCompontsText = '';
    objectGetFlatList(json_value, null, 'children', importComponentsList)
    // console.log('IMPORTCOMPONENTS->>',IMPORTCOMPONENTS)
    let vListTags = objectGetTagsByList(importComponentsList,'tag');
    console.log('vListTags->>',vListTags)
    vListTags.filter(onlyUnique)
    vListTags.forEach((elem)=>{
        console.log("elem->>", elem)
        switch (elem) {
            case ('table'):
                importCompontsText = `${importCompontsText}                
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
`;
                // return '';
                break;
            default:
                // return '';
                break;
        }
    })
    
    // console.log('vListTags->',vListTags)
    result = template.replaceAll('%RENDERTEXT%',renderText)
                     .replaceAll('%PAGENAME%',json_value['namePage'])
                     .replaceAll('%STATEVARIABLES%',JSON.stringify(stateVariables,null,12))
                     .replaceAll('%IMPORTCOMPONENTS%',importCompontsText) 
    return result;
}