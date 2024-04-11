import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

class Page_test_env extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            
            <div  style={{position:'relative'}}>
	<div 
    id="des-main_object"
    style={{"position":"absolute","left":"0px","top":"0px","backgroundColor":"","width":"100%","height":"100%"}}
>
		<input
    id="des-Input_1"
    style={{"position":"absolute","left":"103.84375px","top":"64px","width":"75px","height":"30px"}}
    placeholder={'Поле ввода'}
    defaultValue={'Поле ввода'}
    value={this.state.undefined}
/>
	</div>
</div>
    );}
}



export default Page_test_env;
