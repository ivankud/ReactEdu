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

const Page_generator = () => {
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
      .replace("export default data_objects;", "")
      .replace("let data_objects = ", "");
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
    if (textRef.current) {
      const obj = new SelectionText(textRef.current);
      console.log("obj:", obj);
    }
  }, []);

  function dragElement(element, direction) {
    var md; // remember mouse down info
    const first = document.getElementById("first");
    const second = document.getElementById("second");

    element.onmousedown = onMouseDown;

    function onMouseDown(e) {
      //console.log("mouse down: " + e.clientX);
      md = {
        e,
        offsetLeft: element.offsetLeft,
        offsetTop: element.offsetTop,
        firstWidth: first.offsetWidth,
        secondWidth: second.offsetWidth,
      };

      document.onmousemove = onMouseMove;
      document.onmouseup = () => {
        //console.log("mouse up");
        document.onmousemove = document.onmouseup = null;
      };
    }

    function onMouseMove(e) {
      //console.log("mouse move: " + e.clientX);
      var delta = { x: e.clientX - md.e.clientX, y: e.clientY - md.e.clientY };

      if (direction === "H") {
        // Horizontal
        // Prevent negative-sized elements
        delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth);

        element.style.left = md.offsetLeft + delta.x + "px";
        first.style.width = md.firstWidth + delta.x + "px";
        second.style.width = md.secondWidth - delta.x + "px";
      }
    }
  }

  useEffect(() => {
    dragElement(document.getElementById("separator"), "H");
  }, []);

  return (
    <div>
      <div className={styles["splitter"]} style={{ height: "100vh" }}>
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
        <div id="separator" className={styles["separator"]} />
        <div id="second" className={styles["second"]}>
          {/* <div className="d-flex justify-content-center w-100">
            <h1> </h1>
          </div> */}
          {/* <Button // кнопка сохранения сгенерированного кода в файл
            id="saveButtonForGenCode"
            className="w-100"
            disabled={file?false:true}
            onClick={() => {
              if(file){
                var blob = new Blob([renderClass], {
                  type: "text/plain;charset=utf-8",
                });
                saveAs(blob, `${file["name"]}.jsx`);
              }
            }}
          >
            Сохранить
          </Button> */}
          {/* <textarea
            id="genCodeTextarea"
            value={renderClass}
            style={{ height: "90vh", width: "100%" }}
          /> */}        

          {/* <CodeEditor
            value={renderClass}
            ref={textRef}
            language="js"
            placeholder="Please enter JS code."
            onChange={(evn) => setRenderClass(evn.target.value)}
            padding={40}
            style={{
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              fontSize: 12,
            }}
          /> */}
          <FileReadWriteViewer content={renderClass}/>
        </div>
      </div>
    </div>
  );
};

export default Page_generator;
