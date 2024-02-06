import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import {Object} from './../../../components';

import { saveAs } from "file-saver";
// import ReactDomServer from 'react-dom/server';

import {
  // ObjectJson,
  Button,
  ObjectTree,
  // ResizableBox,
  // Content,
  // SwaggerAPITree
  TableModelDialog,
  SelectionFrame,
} from "../../../components";

import {
  convertJsonToRenderText,
  convertJsonToRenderClass,
} from "../../../utils";

// import { Resizable  } from 'react-resizable';

// import data_objects from '../../../../data/jsobject2';

import data_objects from "../../../../data/jsobject3";
import config_app from "../../../../data/config_app";

import styles from "./Page_test_env2.module.css";
// import { updateObject } from '../../../utils';

const Page_test_env2 = () => {
  const [state, setState] = useState({count:1});
  console.log(this)
  // const vstate = state;
  
  // let funk = //`${funkBody}`
  //  "function () {       return 'Hello, ${JSON.stringify(state)}'   }";
  // const recursiveFn = new Function(
    // `return ${funk}`
    // "return function (name) { return `Hello, ${state.count}` }",
  // )();

  // useEffect(()=>{
    // if(typeof state !== 'undefined'){
      // let funkBody = "return function (name) { console.log(123123123123); return `Hello, 1` }";
      // let funk = new Function(funkBody)();
      // console.log('funk->>',funk)   
      // console.log('state->>',state)   
      // funk = funk.bind(this);
      // let s = funk();
      // console.log(s)
    // }
  // },[state])
  useEffect(()=>{
    console.log('bbb',state)
  //   if(typeof state !== 'undefined'){
  //     console.log('..',state)
      let funkBody = "return function (name) { return `Hello, ${state.count}` }";
      let funk = new Function(funkBody)();
      const funk1 = funk.bind(this)
      
    // }
  },[])
  return (
    <div id='main_frame' style={{ position: "relative" }}>
      <div>
        <p>Вы нажали {state.count} раз</p>
        <button onClick={() => {
          setState({...state, count: state.count+1})
          }
        }>
          Нажми на меня
        </button>
        <button onClick={()=>{
            
          }
        }>
          Нажми на меня
        </button>
      </div>
    </div>
  );
};

export default Page_test_env2;
