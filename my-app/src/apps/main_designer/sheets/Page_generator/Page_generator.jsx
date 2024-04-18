import React, { useEffect, useState } from "react";

import { Button } from "../../../components";

import { FileReadWriteViewer } from "../../../components";

import { saveAs } from "file-saver";

// import beautify_js from 'js-beautify';

import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
// import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';

import {
  convertJsonToRenderClass,
  selectAndReadFileFromWindow, // открытие окна для выбора файла и считывания содердимого JSON
} from "../../../utils";

import styles from "./Page_generator.module.css";

import data_objects from "../../../../data/jsobject3";


import Split from "@uiw/react-split";

const Page_generator = (props) => {
  const textRef = React.useRef();
  const [JSONContent, setJSONContent] = useState(/*data_objects*/ undefined); // контент полученный из файла в нем хранится JSON для генерации страницы
  const [renderClass, setRenderClass] = useState(
    // convertJsonToRenderClass(data_objects)
    null
  );
  const [file, setterFile] = useState(null);

  const setJSONContentFromFile = (value) => {
    /*прочтение контента из файла и установка в шаблон*/
    let vValue = value
      ?.replace("export default data_objects;", "")
      ?.replace("let data_objects = ", "");
    // console.log('vValue->>')
    // console.log(vValue)
    setJSONContent(JSON.parse(vValue));
    let vRenderClass = convertJsonToRenderClass(JSON.parse(vValue))
    // var beautify = require('js-beautify/js').js;
    // vRenderClass = beautify(vRenderClass, { indent_size: 4, space_in_empty_paren: false })
    // vRenderClass = beautify_js.beautify(vRenderClass)
    setRenderClass(vRenderClass);
  };

  useEffect(() => {
    // setRenderClass(convertJsonToRenderClass(JSONContent))
    // setRenderClass(''
    // convertJsonToRenderClass(JSONContent)
    // )
  }, [JSONContent]);

  useEffect(() => {
    setJSONContent(props.content)
    console.log('props.content->>',props.content)
    let vRenderClass = convertJsonToRenderClass(props.content)
    setRenderClass(vRenderClass);
    // setRenderClass(convertJsonToRenderClass(JSONContent))
    // setRenderClass(''
    // convertJsonToRenderClass(JSONContent)
    // )
  }, [props.content]);

  useEffect(() => {
    if (textRef.current) {
      const obj = new SelectionText(textRef.current);
      console.log("obj:", obj);
    }
  }, []);

  return (
      <Split className="w-100 h-100">
        <div id="first" className={styles["first"]}>
          <div className="d-flex justify-content-center w-100">
            <h1>Выберите JSON страницы</h1>
          </div>
          <Button
            className="w-100"
            onClick={() => {
              selectAndReadFileFromWindow(setJSONContentFromFile,setterFile);
            }}
          >
            Открыть файл
          </Button>
          <textarea
            value={`${JSON.stringify(JSONContent, null, 4)}`}
            style={{ width: "100%" }}
          />
        </div>
        <FileReadWriteViewer content={renderClass}/>
      </Split>
  );
};

export default Page_generator;
