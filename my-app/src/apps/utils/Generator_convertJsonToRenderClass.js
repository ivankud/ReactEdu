
import convertJsonToRenderText from './Generator_convertJsonToRenderText';


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
    
    result = template.replaceAll('%RENDERTEXT%',renderText)
                     .replaceAll('%PAGENAME%',json_value['namePage'])
                     .replaceAll('%STATEVARIABLES%',JSON.stringify(stateVariables,null,12))
                     .replaceAll('%IMPORTCOMPONENTS%','') 
    return result;
}