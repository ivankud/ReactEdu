import {
  Button,
  Board,
  Console,
  ObjectJson,
  ObjectTargetInfo,
  CompanentPanel,
  ObjectTree,
} from "../../../components";

import moment from "moment/moment";

import {
  getElementById,
  getPathById,
  updateObject,
  objectReverse,
  dragElement,  
  alignObjectsVertical,
  alignObjectsHorizontal,
  alignObjectsFullWidth,
  alignObjectsFullHeight,
} from "../../../utils";
import React, { useState, useEffect } from "react";
// import data_objects from './jsobject'
import data_objects from "../../../../data/jsobject";
// import alignObjectsHorizontal from "../../../utils";
// import alignObjectsVertical from "../../../utils";

const Page_Designer = () => {
  // const MainJson = data_objects
  const [mouseMode, setMouseMode] =
    useState(
      "HANDLE"
    ); /* mouseMode: HANDLE RESIZE MOVENEWITEM DELETEITEM COPYITEM*/
  const [overTargetID, setOverTargetID] =
    useState(null); /*компонент над котором перетаскивается новый объект*/
  const [newItem, setNewItem] = useState(null); /*новый перетаскиваемый объект*/
  const [selectionFrameSize, setSelectionFrameSize] = useState({
    width: 0,
    height: 0,
  });
  const [messageConsole, setMessageConsole] = useState({});
  const [modeConsole, setModeConsole] = useState("TARGET");
  const [MainJson, setMainJSON] = useState(data_objects);
  const [targetId, setTargetId] = useState("main_object");
  const [targetPath, setTargetPath] = useState(getPathById(MainJson, targetId));
  const [templateJSON, setTemplateJSON] = useState(getElementById(MainJson, targetId));   // !!!ВЫБРАННЫ ОБЪЕКТ
  // catchByObject(targetNode, "id", selectedElem)
  // selectedElem=[...selectedElem.filter(id=>id!=='')]
  const [selectedElems, setSelectedElems] = useState([]);
  let arrGrid = Array(100).fill(Array(100).fill(0));

  function changeMessageConsole(eventmessage) {
    /*Добавляет сообщения в консоль*/
    let vmessageConsole = JSON.parse(JSON.stringify(messageConsole));
    vmessageConsole[
      `${moment(new Date()).format("YYYY.MM.DD hh:mm:ss")}`
    ] = `${eventmessage}`;
    setMessageConsole(vmessageConsole);
  }

  function changeTargetId(valueId, targetNode) {
    console.log(54321)
    /*Функция меняет выбранный объект
     * valueId - id выбранного объекта
     * targetNode - элемент DOM-дерева, нужен чтобы выщитать все вложенные объекты
     */
    if (valueId && valueId !== "SelObjectFrame" && valueId !== targetId) {
      let selectedElem = [];
      if (targetNode) catchByObject(targetNode, "id", selectedElem);
      selectedElem = [...selectedElem.filter((id) => id !== "" && id.startsWith('des-'))];
      let path = getPathById(MainJson, valueId);
      let templateJSON = getElementById(MainJson, valueId);
      
        setTargetId(valueId);
        setSelectedElems(selectedElem);
        setTargetPath(path);
        setTemplateJSON(templateJSON);
        setSelectionFrameSize({});
        changeMessageConsole(`Выбран объект ${valueId}`);
    }
    else if (valueId && valueId === targetId) {
      // let selectedElem = [];
      // if (targetNode) catchByObject(targetNode, "id", selectedElem);
      // selectedElem = [...selectedElem.filter((id) => id !== "" && id.startsWith('des-'))];
      // let path = getPathById(MainJson, valueId);
      // let templateJSON = getElementById(MainJson, valueId);
      
        changeMessageConsole(`Выбор с объекта ${valueId} снят `);
        setTargetId(null);
        setSelectedElems(null);
        setTargetPath('');
        setTemplateJSON(null);
        setSelectionFrameSize({});
    }
    else {
      changeMessageConsole(`Ошибка место changeTargetId_13212ASDF `);
    }
  }
  const changeTemplateJSON = (value) => {
    /*Устанавливает и меняет выбранный объект*/
    setTemplateJSON(JSON.parse(value));
    setMainJSON(updateObject(MainJson, targetPath, JSON.parse(value)));
    changeMessageConsole(
      `Изменен выбранный объект ${JSON.parse(value)["id"]}-path>>${targetPath}`
    );
  };

  const addNewChildOnElement = (event) => {
    let vTargetNode = document.getElementById(overTargetID);
    changeTargetId(overTargetID, vTargetNode);
    let vTemplateJSON = getElementById(MainJson, overTargetID);
    setTemplateJSON(vTemplateJSON);
    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.x;
    let y = event.clientY - rect.y;
    let vNewItem = JSON.parse(JSON.stringify(newItem));
    vNewItem.style.left = x + "px";
    vNewItem.style.top = y + "px";
    /*вычисление id для нового объекта↓↓↓↓↓↓*/
    let vNextItemId = vNewItem.id.replace("Template", "");
    let aID = [];
    catchByObject(MainJson, "id", aID);
    let varr = aID
      .map((item) => item.toLowerCase())
      .filter((item) => !item.search(new RegExp(vNextItemId, "i")))
      .filter((item) => !isNaN(Number(item.split("_")[1])))
      .map((item) => Number(item.split("_")[1]));
    let vLen = varr.length; /*Так надо*/
    let nextID = vLen > 0 ? Math.max(...varr) + 1 : 1;
    vNewItem.id = vNextItemId + "_" + String(nextID);
    /*вычисление id для нового объекта↑↑↑↑↑↑*/
    if (!Object.hasOwn(vTemplateJSON, "children")) vTemplateJSON.children = [];
    vTemplateJSON.children.push(vNewItem);
    setTemplateJSON(vTemplateJSON);
    changeMessageConsole(
      `В объект ${overTargetID} добавлен новый компонент ${vNewItem.id}`
    );
    changeTargetId(vNewItem.id);
  };

  const catchByObject = (object, tag, value) => {
    // console.log('object',object)
    if (object[tag] !== undefined) {
      value.push(object[tag]);
    }
    if (object["children"] !== undefined) {
      Object.keys(object.children).forEach((key) => {
        catchByObject(object.children[key], tag, value);
      });
    }
  };

  function changeСoordinatesSelectedElem(coord) {
    let vCoord = JSON.parse(JSON.stringify(coord));
    let path = getPathById(MainJson, targetId);
    let vTemplateJSON = getElementById(MainJson, targetId);
    let style = Object.hasOwn(vTemplateJSON, "style")
      ? JSON.parse(JSON.stringify(vTemplateJSON["style"]))
      : {};
    style["top"] = vCoord.top;
    style["left"] = vCoord.left;
    vTemplateJSON["style"] = style;
    setTemplateJSON(vTemplateJSON);
    changeMessageConsole(
      `Изменен выбранный объект ${vTemplateJSON["id"]}-path>>${path}`
    );
    setMainJSON(updateObject(MainJson, path, vTemplateJSON));
  }

  const changeSelectionFrame = () => {
    /*Вычисляет рамку объеденяющую родительский компонент и всех входящих элементов - здесь не происходит вычисление потомков selectedElems, они вычисляются в другом месте*/
    let minX, minY, maxX, maxY;
    let aX = [],
      aY = [];
    if (targetId && targetId !== "main_object" && selectedElems) {
      selectedElems.forEach((id) => {
        let vRect = document.getElementById(id).getBoundingClientRect();
        aX.push(vRect.x);
        aX.push(vRect.x + vRect.width);
        aY.push(vRect.y);
        aY.push(vRect.y + vRect.height);
        minX = Math.min(...aX);
        maxX = Math.max(...aX);
        minY = Math.min(...aY);
        maxY = Math.max(...aY);
        dragElement(
          document.getElementById(targetId),
          changeСoordinatesSelectedElem
        );
        setSelectionFrameSize({ width: maxX - minX, height: maxY - minY });
      });
    }
  };

  useEffect(() => {
    /*вешает событие drag на компонент*/
    if (targetId !== "main_object") {
      dragElement(
        document.getElementById(targetId),
        changeСoordinatesSelectedElem
      );
    }
  }, [MainJson, selectedElems, targetId, selectionFrameSize, changeСoordinatesSelectedElem]);

  useEffect(() => {
    /*вычисляет размеры рамки объекта*/
    /*P.S. надо пропихнуть такое же событие на изменение положение элемента, но пока пусть будет так*/
    changeSelectionFrame();
  }, [MainJson, selectedElems, templateJSON]);
  return (
    /* mouseMode: HANDLE MOVENEWITEM DELETEITEM COPYITEM*/
    <div>
      <div
        style={{ width: "100vw", backgroundColor: "#d1cfcd", height: "70px" }}
        className="d-flex align-items-center"
      >
        <div style={{ padding: "5px", widht: "100%" }}>
          <Button
            className={mouseMode === "HANDLE" ? `bg-info` : ""}
            onClick={() => {
              setMouseMode("HANDLE");
            }}
          > 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-textarea-resize"
              viewBox="0 0 16 16"
            >
              <path d="M0 4.5A2.5 2.5 0 0 1 2.5 2h11A2.5 2.5 0 0 1 16 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 11.5v-7zM2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3h-11zm10.854 4.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0zm0 2.5a.5.5 0 0 1 0 .708l-.5.5a.5.5 0 0 1-.708-.708l.5-.5a.5.5 0 0 1 .708 0z" />
            </svg>
          </Button>
           
          <Button
            className={mouseMode === "RESIZE" ? `bg-info` : ""}
            onClick={() => {
              setMouseMode("RESIZE");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-hand-index-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002z" />              
            </svg>
            
          </Button>
           
          <Button          
            className={mouseMode === "RESIZE" ? `bg-info` : ""}
            onClick={() => {
              alignObjectsVertical(templateJSON)
            }}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-hand-index-fill"
            viewBox="0 0 16 16"
          >
            <path d="M 8.02 0.419 L 8 16 L 8 2 h -1 A 1 1 0 0 0 7 5 L 9 5 A 1 1 0 0 0 9 2 L 8 2 L 8 7 L 5 7 A 1 1 0 0 0 5 10 L 11 10 A 1 1 0 0 0 11 7 L 8 7 L 8 12 L 3 12 A 1 1 0 0 0 3 15 L 13 15 A 1 1 0 0 0 13 12 L 8 12" />              
          </svg>
          </Button> 
          <Button          
            className={mouseMode === "RESIZE" ? `bg-info` : ""}
            onClick={() => {
              alignObjectsHorizontal(templateJSON)
            }}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-hand-index-fill"
            viewBox="0 0 16 16"
          >
            <path d="M 0 8 L 15 8 L 1 8 L 1 10 A 1 1 0 0 0 4 10 L 4 6 A 1 1 0 0 0 1 6 L 1 8 L 6 8 L 6 12 A 1 1 0 0 0 9 12 L 9 4 A 1 1 0 0 0 6 4 L 6 8 L 11 8 L 11 14 A 1 1 0 0 0 14 14 L 14 2 A 1 1 0 0 0 11 2 L 11 8" />              
          </svg>
          </Button> 
          <Button          
            className={mouseMode === "RESIZE" ? `bg-info` : ""}
            onClick={() => {
              alignObjectsFullWidth(templateJSON)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-hand-index-fill"
              viewBox="0 0 16 16"
            >
              <path d="m 1 1 V 15 H 2 V 1 H 1 m 5 9 v 5 L 3 8 L 6 1 V 6 L 10 6 V 1 L 13 8 L 10 15 V 10 H 6 m 8 -9 V 15 H 15 V 1 H 14" />              
            </svg>
          </Button>
           
          <Button          
            className={mouseMode === "RESIZE" ? `bg-info` : ""}
            onClick={() => {
              alignObjectsFullHeight(templateJSON)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-hand-index-fill"
              viewBox="0 0 16 16"
            >
              <path d="m 1 1 V 2 H 15 V 1 h -14 m 0 13 h 14 V 15 H 1 V 14 m 0 -4 L 8 13 L 15 10 H 10 V 6 H 15 L 8 3 L 1 6 H 6 V 10 H 1" />              
            </svg>
          </Button>
           
          <Button          
            className={mouseMode === "RESIZE" ? `bg-info` : ""}
            onClick={() => {
              alignObjectsFullHeight(templateJSON)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-hand-index-fill"
              viewBox="0 0 16 16"
            >
              <path d="m 13 3 L 4 3 C 0 3 0 13 4 13 H 12 C 16 13 16 5 12 5 H 5.007 C 2 5 2 11 5 11 H 11 C 13 11 13 7 11 7 H 6 C 5 7 5 8 6 8 H 11 C 12 8 12 10 11 10 h -6 C 3 10 3 6 5 6 H 12 C 15 6 15 12 12 12 H 4 C 1 12 1 4 4 4 H 13 C 14 4 14 3 13 3" />              
            </svg>
          </Button>
        </div>
      </div>
      <div
        style={{ backgroundColor: "#f1f1f1", width: "100vw", height: "10px" }}
      />
      <div
        style={{
          display: "inline-block",
          padding: "0px",
          backgroundColor: "#d1cfcd",
          height: "65vh",
          verticalAlign: "top",
          width: "20vw",
        }}
      >
        <ObjectTree
          data_objects={MainJson}
          changeTargetId={changeTargetId}
          targetId={targetId}
        />
        <div style={{ overflow: "scroll", height: "400px" }}>
          <ObjectTargetInfo
            targetPath={targetPath}
            targetId={targetId}
            changeTargetId={changeTargetId}
          />
          <ObjectJson
            data_objects={templateJSON}
            set_data_objects={changeTemplateJSON}
            changeMessageConsole={changeMessageConsole}
          />
        </div>
      </div>
      <div
        style={{
          display: "inline-block",
          height: "65vh",
          overflow: "scroll",
          width: "50vw",
        }}
      >
        <Board
          grid={arrGrid}
          data_objects={MainJson}
          changeTargetId={changeTargetId}
          changeTemplateJSON={changeTemplateJSON}
          targetId={targetId}
          selectedElems={selectedElems}
          selectionFrameSize={selectionFrameSize}
          mouseMode={mouseMode}
          addNewChildOnElement={addNewChildOnElement}
          setOverTargetID={setOverTargetID}
        />
      </div>
      <div
        style={{
          display: "inline-block",
          padding: "0px",
          backgroundColor: "#FFFFE0",
          height: "65vh",
          verticalAlign: "top",
          width: "300px",
        }}
      >
        <CompanentPanel setMouseMode={setMouseMode} setNewItem={setNewItem} />
      </div>
      <div style={{ height: "300px" }}>
        <Button
          className={
            modeConsole === "TARGET"
              ? "btn-secondary disabled"
              : "btn-info active"
          }
          onClick={() => {
            setModeConsole("TARGET");
          }}
        >
          Выбранный объект
        </Button>
        <Button
          className={
            modeConsole === "MAIN"
              ? "btn-secondary disabled"
              : "btn-info active"
          }
          onClick={() => {
            setModeConsole("MAIN");
          }}
        >
          Общий объект
        </Button>
        <Button
          className={
            modeConsole === "CONSOLE"
              ? "btn-secondary disabled"
              : "btn-info active"
          }
          onClick={() => {
            setModeConsole("CONSOLE");
          }}
        >
          Консоль
        </Button>
        {modeConsole === "CONSOLE" && (
          <Button
            style={{ backgroundColor: "#fa7a7a" }}
            size="md"
            onClick={() => {
              setMessageConsole({});
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
            Очистить консоль
          </Button>
        )}
        {modeConsole === "TARGET" && <Console data_objects={templateJSON} />}
        {modeConsole === "MAIN" && <Console data_objects={MainJson} />}
        {modeConsole === "CONSOLE" && (
          <Console
            data_objects={JSON.parse(
              JSON.stringify(objectReverse(messageConsole), null, 4)
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Page_Designer;
