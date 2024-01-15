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
} from "../../../utils";
import React, { useState, useEffect } from "react";
// import data_objects from './jsobject'
import data_objects from "../../../../data/jsobject";

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
    /*Функция меняет выбранный объект
     * valueId - id выбранного объекта
     * targetNode - элемент DOM-дерева, нужен чтобы выщитать все вложенные объекты
     */
    if (valueId && valueId !== "SelObjectFrame") {
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
    // console.log();
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
              width="16"
              height="16"
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
              width="16"
              height="16"
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
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-hand-index-fill"
              viewBox="0 0 16 16"
            >
              <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4.25L16.5322 4.25C16.972 4.24998 17.3514 4.24997 17.6627 4.27818C17.9918 4.30802 18.3178 4.37407 18.625 4.55144C18.967 4.74892 19.2511 5.03296 19.4486 5.375C19.6259 5.68221 19.692 6.00817 19.7218 6.33735C19.75 6.64865 19.75 7.028 19.75 7.46779V7.53221C19.75 7.972 19.75 8.35135 19.7218 8.66265C19.692 8.99183 19.6259 9.31779 19.4486 9.625C19.2511 9.96704 18.967 10.2511 18.625 10.4486C18.3178 10.6259 17.9918 10.692 17.6627 10.7218C17.3514 10.75 16.972 10.75 16.5322 10.75H12.75V13.25H14.5322C14.972 13.25 15.3514 13.25 15.6627 13.2782C15.9918 13.308 16.3178 13.3741 16.625 13.5514C16.967 13.7489 17.2511 14.033 17.4486 14.375C17.6259 14.6822 17.692 15.0082 17.7218 15.3373C17.75 15.6486 17.75 16.028 17.75 16.4678V16.5322C17.75 16.972 17.75 17.3514 17.7218 17.6627C17.692 17.9918 17.6259 18.3178 17.4486 18.625C17.2511 18.967 16.967 19.2511 16.625 19.4486C16.3178 19.6259 15.9918 19.692 15.6627 19.7218C15.3514 19.75 14.972 19.75 14.5322 19.75H12.75V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V19.75H9.46775C9.02797 19.75 8.64864 19.75 8.33735 19.7218C8.00817 19.692 7.68221 19.6259 7.375 19.4486C7.03296 19.2511 6.74892 18.967 6.55144 18.625C6.37408 18.3178 6.30802 17.9918 6.27818 17.6627C6.24997 17.3514 6.24998 16.972 6.25 16.5322V16.4678C6.24998 16.028 6.24997 15.6486 6.27818 15.3373C6.30802 15.0082 6.37408 14.6822 6.55144 14.375C6.74892 14.033 7.03296 13.7489 7.375 13.5514C7.68221 13.3741 8.00817 13.308 8.33735 13.2782C8.64865 13.25 9.028 13.25 9.46779 13.25H11.25V10.75H7.4678C7.028 10.75 6.64865 10.75 6.33735 10.7218C6.00817 10.692 5.68221 10.6259 5.375 10.4486C5.03296 10.2511 4.74892 9.96704 4.55144 9.625C4.37407 9.31779 4.30802 8.99183 4.27818 8.66265C4.24997 8.35136 4.24998 7.97201 4.25 7.53222V7.46778C4.24998 7.02799 4.24997 6.64864 4.27818 6.33735C4.30802 6.00817 4.37407 5.68221 4.55144 5.375C4.74892 5.03296 5.03296 4.74892 5.375 4.55144C5.68221 4.37407 6.00817 4.30802 6.33735 4.27818C6.64864 4.24997 7.02799 4.24998 7.46778 4.25C7.47848 4.25 7.48922 4.25 7.5 4.25H11.25V2C11.25 1.58579 11.5858 1.25 12 1.25ZM7.5 5.75C7.01889 5.75 6.7082 5.75072 6.47275 5.77206C6.2476 5.79246 6.16586 5.82689 6.125 5.85048C6.01099 5.91631 5.91631 6.01099 5.85048 6.125C5.82689 6.16586 5.79247 6.2476 5.77206 6.47274C5.75072 6.7082 5.75 7.01889 5.75 7.5C5.75 7.98111 5.75072 8.2918 5.77206 8.52726C5.79247 8.7524 5.82689 8.83414 5.85048 8.875C5.91631 8.98901 6.01099 9.08369 6.125 9.14952C6.16587 9.17311 6.2476 9.20754 6.47275 9.22794C6.7082 9.24928 7.01889 9.25 7.5 9.25H16.5C16.9811 9.25 17.2918 9.24928 17.5273 9.22794C17.7524 9.20754 17.8341 9.17311 17.875 9.14952C17.989 9.08369 18.0837 8.98901 18.1495 8.875C18.1731 8.83414 18.2075 8.7524 18.2279 8.52725C18.2493 8.2918 18.25 7.98111 18.25 7.5C18.25 7.01889 18.2493 6.7082 18.2279 6.47275C18.2075 6.2476 18.1731 6.16586 18.1495 6.125C18.0837 6.01099 17.989 5.91631 17.875 5.85048C17.8341 5.82689 17.7524 5.79246 17.5273 5.77206C17.2918 5.75072 16.9811 5.75 16.5 5.75H7.5ZM9.5 14.75C9.01889 14.75 8.7082 14.7507 8.47275 14.7721C8.2476 14.7925 8.16586 14.8269 8.125 14.8505C8.01099 14.9163 7.91631 15.011 7.85048 15.125C7.82689 15.1659 7.79247 15.2476 7.77206 15.4727C7.75072 15.7082 7.75 16.0189 7.75 16.5C7.75 16.9811 7.75072 17.2918 7.77206 17.5273C7.79247 17.7524 7.82689 17.8341 7.85048 17.875C7.91631 17.989 8.01099 18.0837 8.125 18.1495C8.16586 18.1731 8.2476 18.2075 8.47275 18.2279C8.7082 18.2493 9.01889 18.25 9.5 18.25H14.5C14.9811 18.25 15.2918 18.2493 15.5273 18.2279C15.7524 18.2075 15.8341 18.1731 15.875 18.1495C15.989 18.0837 16.0837 17.989 16.1495 17.875C16.1731 17.8341 16.2075 17.7524 16.2279 17.5273C16.2493 17.2918 16.25 16.9811 16.25 16.5C16.25 16.0189 16.2493 15.7082 16.2279 15.4727C16.2075 15.2476 16.1731 15.1659 16.1495 15.125C16.0837 15.011 15.989 14.9163 15.875 14.8505C15.8341 14.8269 15.7524 14.7925 15.5273 14.7721C15.2918 14.7507 14.9811 14.75 14.5 14.75H9.5Z" fill="#1C274C"></path> </g>
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
