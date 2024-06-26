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

import Split from "@uiw/react-split";

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
  onlyUnique,
  joinChildrenObjectsInDiv,
  getIdByPath,
  getIdParentByPath,
} from "../../../utils";
import React, { useState, useEffect } from "react";
// import data_objects from './jsobject'
import data_objects from "../../../../data/jsobject";
// import alignObjectsHorizontal from "../../../utils";
// import alignObjectsVertical from "../../../utils";

import Page_generator from "../Page_generator";

const Page_Designer = () => {
  // const MainJson = data_objects
  const [viewMode, setViewMode] =
    useState(
      "DESIGNER"
    ); /* viewMode: GENERATOR DESIGNER PAGE*/
  const [mouseMode, setMouseMode] =
    useState(
      "HANDLE"
    ); /* mouseMode: HANDLE RESIZE MOVENEWITEM DELETEITEM COPYITEM CANJOIN*/
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
  const [targetId, setTargetId] = useState("des-main_object");
  const [targetPath, setTargetPath] = useState(getPathById(MainJson, targetId));
  const [templateJSON, setTemplateJSON] = useState(
    getElementById(MainJson, targetId)
  ); // !!!ВЫБРАННЫ ОБЪЕКТ
  // catchByObject(targetNode, "id", selectedElem)
  // selectedElem=[...selectedElem.filter(id=>id!=='')]
  const [selectedElems, setSelectedElems] = useState([]);
  const [selectedHeapElems, setSelectedHeapElems] = useState([]);
  let arrGrid = Array(100).fill(Array(100).fill(0));

  function changeMessageConsole(eventmessage) {
    /*Добавляет сообщения в консоль*/
    let vmessageConsole = JSON.parse(JSON.stringify(messageConsole));
    vmessageConsole[
      `${moment(new Date()).format("YYYY.MM.DD hh:mm:ss")}`
    ] = `${eventmessage}`;
    setMessageConsole(vmessageConsole);
  }

  function deleteObject() {
    if (
      targetId &&
      (targetId !== "main_object" || targetId !== "des-main_object") &&
      selectedElems
    ) {
      let vPath = getPathById(MainJson, targetId);
      // let idparent = getIdByPath(MainJson,vPath)
      let idparent = getIdParentByPath(MainJson, vPath);

      let templateJSON = getElementById(MainJson, idparent);
      let vChildren = templateJSON.children.filter((ch) => ch.id !== targetId);
      templateJSON.children = vChildren;
      let valueId = templateJSON.id;
      changeTargetId(valueId);
      setTemplateJSON(templateJSON);
    }
  }

  function changeTargetAddIdOnHeap(valueId, targetNode, command) {
    /*Добавляет объект к списку выделенных объектов для группировки*/
    // console.log("valueId->",valueId);
    let vHeap = JSON.parse(JSON.stringify(selectedHeapElems));
    // console.log('Original vHeap->>',vHeap);
    let vCommand = "";
    if (vHeap.indexOf(valueId) === -1) {
      vHeap.push(valueId);
      vCommand = "add";
    } else {
      let vHeap_tmp = vHeap.filter((elem) => elem !== valueId);
      vHeap = JSON.parse(JSON.stringify(vHeap_tmp));
      vCommand = "delete";
    }
    // console.log('vHeap->>',vHeap);
    setSelectedHeapElems(vHeap.filter(onlyUnique));
    let selectedElem = [];
    let checkJoinHeap = true;
    let vPath = getPathById(MainJson, valueId)
      .split(">")
      .slice(0, -1)
      .join(">");

    vHeap.forEach((elem) => {
      if (
        vPath !== getPathById(MainJson, elem).split(">").slice(0, -1).join(">")
      ) {
        checkJoinHeap = false;
      }
      let innerElem = [];
      catchByObject(document.getElementById(elem), "id", innerElem);
      selectedElem = JSON.parse(JSON.stringify(selectedElem.concat(innerElem)));
    });
    if (checkJoinHeap && vHeap.length > 1) {
      setMouseMode("CANJOIN");
    } else {
      setMouseMode("HANDLE");
    }
    // console.log(selectedElem)
    // if (targetNode) catchByObject(targetNode, "id", selectedElem);
    selectedElem = [
      ...selectedElem.filter((id) => id !== "" && id.startsWith("des-")),
    ]; // comment "des-" нужна для отделения объектов от всех остальных сокражение от designer
    // let path = getPathById(MainJson, valueId);
    selectedElem.concat(selectedElem);
    let vSelectedElem = selectedElem.filter(onlyUnique);
    console.log("vSelectedElem->>", vSelectedElem);
    setTargetId(null);
    setSelectedElems(vSelectedElem);
    setTargetPath(null);
    setTemplateJSON(null);
    setSelectionFrameSize({});
    changeMessageConsole(`В выбранные объекты добавлен ${valueId}`);
    changeMessageConsole(`Dыбранные объекты ${vSelectedElem}`);
  }

  function joinObjectsButton() {
    let vNewContainer = joinChildrenObjectsInDiv(MainJson, selectedHeapElems);
    // console.log(vNewContainer)
    if (selectedHeapElems.length) {
      // console.log('selectedHeapElems[0]',selectedHeapElems[0])
      let vPath = getPathById(MainJson, selectedHeapElems[0]);
      // let idparent = getIdByPath(MainJson,vPath)
      let idparent = getIdParentByPath(MainJson, vPath);

      // console.log("idparent",idparent)

      /*вычисление id для нового объекта↓↓↓↓↓↓*/
      let vNextItemId = "des-" + vNewContainer.id.replace("Template", "");
      let aID = [];
      catchByObject(MainJson, "id", aID);
      let varr = aID
        .map((item) => item.toLowerCase())
        .filter((item) => !item.search(new RegExp(vNextItemId, "i")))
        .filter((item) => !isNaN(Number(item.split("_")[1])))
        .map((item) => Number(item.split("_")[1]));
      let vLen = varr.length; /*Так надо*/
      let nextID = vLen > 0 ? Math.max(...varr) + 1 : 1;
      vNewContainer.id = vNextItemId + "_" + String(nextID);
      /*вычисление id для нового объекта↑↑↑↑↑↑*/

      let templateJSON = getElementById(MainJson, idparent);
      let vChildren = templateJSON.children.filter(
        (ch) => selectedHeapElems.indexOf(ch.id) === -1
      );
      templateJSON.children = vChildren;
      templateJSON.children.push(vNewContainer);
      setTemplateJSON(templateJSON);
      let valueId = templateJSON.children[templateJSON.children.length - 1].id;
      changeTargetId(valueId);
      setMouseMode("HANDLE");
    }
  }

  function disJoinObjectsButton() {
    let vPath = getPathById(MainJson, targetId);
    console.log("path->>", vPath);
    console.log("check path->>", getIdByPath(MainJson, vPath));
    let vParentID = getIdParentByPath(MainJson, vPath);
    console.log("vParentID", vParentID);
    changeTargetId(vParentID);
    let vParentTemplateJSON = getElementById(MainJson, vParentID);
    console.log("vParentTemplateJSON", vParentTemplateJSON);
    let vParentChildren = vParentTemplateJSON.children.filter(
      (ch) => ch.id !== targetId
    );
    let vStyle = templateJSON.style;
    let vChildren = JSON.parse(JSON.stringify(templateJSON.children));
    // vChildren.forEach(ch=>vParentChildren.push(ch))

    vChildren.forEach((ch) => {
      let reg = new RegExp("[0-9]*");
      switch (ch.style.top.replace(reg, "")) {
        case "px":
          console.log('inner object top "px"');
          ch.style.top =
            Number(ch.style.top.replace("px", "")) +
            Number(vStyle.top.replace("px", "")) +
            "px";
          break;
        case "%":
          console.log('inner object top "%"');
          console.log("#TODO_0042");
          break;
        default:
          console.log('inner object top "default"');
          console.log("#TODO_0043");
          break;
      }

      switch (ch.style.left.replace(reg, "")) {
        case "px":
          console.log('inner object left "px"');
          ch.style.left =
            Number(ch.style.left.replace("px", "")) +
            Number(vStyle.left.replace("px", "")) +
            "px";
          break;
        case "%":
          console.log('inner object left "%"');
          console.log("#TODO_0044");
          break;
        default:
          console.log('inner object left "default"');
          console.log("#TODO_0045");
          break;
      }
      console.log("ch.style->>", ch.style);
      // ch.style.left = ch.style.left + vStyle.left;
      // ch.style.top = ch.style.left + vStyle.top;
      vParentChildren.push(ch);
    });
    console.log("filtered children after disJoin");
    console.log("vParentChildren", vParentChildren);
    vParentTemplateJSON.children = JSON.parse(JSON.stringify(vParentChildren));
    let selectedElem = [];
    catchByObject(document.getElementById(vParentID), "id", selectedElem);
    console.log("targetId->", targetId);
    selectedElem = [
      ...selectedElem.filter(
        (id) => id !== "" && id !== targetId && id.startsWith("des-")
      ),
    ];
    console.log("selectedElem->", selectedElem);
    console.log("vParentTemplateJSON->", vParentTemplateJSON);
    setTemplateJSON(vParentTemplateJSON);
    setSelectedElems(selectedElem);
    setTargetPath(getPathById(MainJson, vParentID));
    setSelectionFrameSize({});
    changeMessageConsole(`Выбран объект ${vParentID}`);
  }

  function changeTargetId(valueId, targetNode) {
    /*Функция меняет выбранный объект
     * valueId - id выбранного объекта
     * targetNode - элемент DOM-дерева, нужен чтобы выcчитать все вложенные объекты
     * comment "des-" нужна для отделения объектов от всех остальных сокражение от designer
     */
    if (!targetNode) targetNode = document.getElementById(valueId);
    if (valueId && valueId !== "SelObjectFrame" && valueId !== targetId) {
      let selectedElem = [];
      if (targetNode) catchByObject(targetNode, "id", selectedElem);
      selectedElem = [
        ...selectedElem.filter((id) => id !== "" && id.startsWith("des-")),
      ];
      let path = getPathById(MainJson, valueId);
      let templateJSON = getElementById(MainJson, valueId);
      console.log("selectedElem->>", selectedElem);
      setSelectedHeapElems([]);
      setTargetId(valueId);
      setSelectedElems(selectedElem);
      setTargetPath(path);
      setTemplateJSON(templateJSON);
      setSelectionFrameSize({});
      changeMessageConsole(`Выбран объект ${valueId}`);
    } else if (valueId && valueId === targetId) {
      changeMessageConsole(`Выбор с объекта ${valueId} снят `);
      setSelectedHeapElems([]);
      setTargetId(null);
      setSelectedElems(null);
      setTargetPath("");
      setTemplateJSON(null);
      setSelectionFrameSize({});
    } else {
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
    console.log("vNewItem->>>", vNewItem);
    let vNextItemId = "des-" + vNewItem.id.replace("Template", "");
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
    /*выбирвает объект и все вложенные в него рекурсивно*/
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
    // console.log('LABEL changeSelectionFrame')
    // console.log('LABEL selectedElems->>')
    /*Вычисляет рамку объеденяющую родительский компонент и всех входящих элементов - здесь не происходит вычисление потомков selectedElems, они вычисляются в другом месте*/
    let minX, minY, maxX, maxY;
    let aX = [],
      aY = [];
    // console.log('targetId->>',targetId)
    if (
      targetId &&
      (targetId !== "main_object" || targetId !== "des-main_object") &&
      selectedElems
    ) {
      // console.log('!!! selectedElems',selectedElems)
      selectedElems.forEach((id) => {
        // console.log('id',id)
        // console.log('getElementById',document.getElementById(id))
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
    if (targetId !== "main_object" && targetId !== "des-main_object") {
      dragElement(
        document.getElementById(targetId),
        changeСoordinatesSelectedElem
      );
    }
  }, [
    MainJson,
    selectedElems,
    targetId,
    selectionFrameSize,
    changeСoordinatesSelectedElem,
  ]);

  useEffect(() => {
    /*вычисляет размеры рамки объекта*/
    /*P.S. надо пропихнуть такое же событие на изменение положение элемента, но пока пусть будет так*/
    // changeSelectionFrame();
  }, [MainJson, selectedElems, templateJSON]);

  return (
    /* mouseMode: HANDLE MOVENEWITEM DELETEITEM COPYITEM*/
    <div style={{width: "100%", height: '100%'}}>
      <div id="top_container_toolbar_tabs_and_button" style={{ padding: "1px", width: "100%", backgroundColor: "#d1cfcd", height: "5%", display:"block" }} className='border border-1'>        
          <div  id="top_container_toolbar_tabs" style={{ width: "100%" }}>
                  <Button className={`${viewMode==='DESIGNER'?"btn-info":""}`} onClick={()=>{setViewMode('DESIGNER')}}>Конструктор</Button>           
                  <Button className={`${viewMode==='GENERATOR'?"btn-info":""}`} onClick={()=>{setViewMode('GENERATOR')}}>Генератор</Button> 
                  <Button disabled className="bg-warning">Страница @{MainJson['id']}</Button> 
                  <Button>Страница @{MainJson['id']}</Button> 
          </div>
      </div>
      {viewMode==='DESIGNER'&&
        <div id="designer_container" style={{width: "100%", height: '95%',}}>
          <Split id="middle_plitter_part" mode="vertical" style={{ width: "100%", height: '100%', border: '1px solid #d5d5d5', borderRadius: 3 }}>
            <div id="top_container_toolbar_tabs_and_button" style={{ width: "100%", backgroundColor: "#d1cfcd", height: "5%", display:"block" }} className='border border-1'>        
              <div  id="top_container_toolbar_button" style={{ padding: "1px", width: "100%" }}>
                <Button
                  id="toolbarHandleButton"
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
                    <path d="M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002z" />
                  </svg>
                </Button>
                 
                <Button
                  id="toolbarResizeButton"
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
                    <path d="M0 4.5A2.5 2.5 0 0 1 2.5 2h11A2.5 2.5 0 0 1 16 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 11.5v-7zM2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3h-11zm10.854 4.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0zm0 2.5a.5.5 0 0 1 0 .708l-.5.5a.5.5 0 0 1-.708-.708l.5-.5a.5.5 0 0 1 .708 0z" />
                  </svg>
                </Button>
                 
                <Button
                  id="toolbarAlignVertiacalButton"
                  className={mouseMode === "HANDLE" ? `bg-info` : ""}
                  disabled={mouseMode === "HANDLE" ? false : true}
                  onClick={() => {
                    alignObjectsVertical(templateJSON);
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
                  id="toolbarAlignHorizontalButton"
                  className={mouseMode === "HANDLE" ? `bg-info` : ""}
                  disabled={mouseMode === "HANDLE" ? false : true}
                  onClick={() => {
                    alignObjectsHorizontal(templateJSON);
                    // let vTemplateJSON = alignObjectsHorizontal(JSON.parse(JSON.stringify(templateJSON)));
                    // console.log('vTemplateJSON->>>>',vTemplateJSON)
                    // setTargetId(vTemplateJSON.id)
                    // setTemplateJSON(vTemplateJSON);
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
                  id="toolbarStretchHorizontalButton"
                  className={mouseMode === "HANDLE" ? `bg-info` : ""}
                  disabled={mouseMode === "HANDLE" ? false : true}
                  onClick={() => {
                    alignObjectsFullWidth(templateJSON);
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
                  id="toolbarStretchVerticalButton"
                  className={mouseMode === "HANDLE" ? `bg-info` : ""}
                  disabled={mouseMode === "HANDLE" ? false : true}
                  onClick={() => {
                    alignObjectsFullHeight(templateJSON);
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
                  id="toolbarJoinGroupElemButton"
                  className={mouseMode === "CANJOIN" ? `bg-info` : ""}
                  disabled={mouseMode === "CANJOIN" ? false : true}
                  onClick={() => {
                    joinObjectsButton();
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
                    <path d="m 13 3 L 6 3 C 0 3 0 13 6 13 H 11 C 16 13 16 5 11 5 H 6 C 2 5 2 11 6 11 H 11 C 14 11 14 7 11 7 H 6 C 5 7 5 8 6 8 H 11 C 13 8 13 10 11 10 h -5 C 3 10 3 6 6 6 H 11 C 15 6 15 12 11 12 H 6 C 1 12 1 4 6 4 H 12 C 13 4 13 3 12 3" />
                  </svg>
                </Button>
                 
                <Button
                  id="toolbarDisJoinGroupElemButton"
                  // className={mouseMode === "CANDISJOIN" ? `bg-info` : ""}
                  // disabled={mouseMode === "CANDISJOIN" ? false : true}
                  onClick={() => {
                    disJoinObjectsButton();
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
                    <path d="m 13 3 L 6 3 C 0 3 0 13 6 13 H 11 C 16 13 16 5 11 5 H 6 C 2 5 2 11 6 11 H 11 C 14 11 14 7 11 7 H 6 C 5 7 5 8 6 8 H 11 C 13 8 13 10 11 10 h -5 C 3 10 3 6 6 6 H 11 C 15 6 15 12 11 12 H 6 C 1 12 1 4 6 4 H 12 C 13 4 13 3 12 3" />
                    <path d="m 12 11 L 9 8 L 12 5 A 1 1 0 0 0 10 3 L 7 6 L 4 3 A 1 1 0 0 0 2 5 L 5 8 L 2 11 A 1 1 0 0 0 4 13 L 7 10 L 10 13 A 1 1 0 0 0 12 11" />
                  </svg>
                </Button>
                 
                <Button
                  id="toolbarDeleteElemButton"
                  className={
                    mouseMode === "HANDLE" &&
                    targetId &&
                    (targetId !== "main_object" || targetId !== "des-main_object")
                      ? `bg-info`
                      : ""
                  }
                  disabled={
                    mouseMode === "HANDLE" &&
                    targetId &&
                    (targetId !== "main_object" || targetId !== "des-main_object")
                      ? `bg-info`
                      : ""
                  }
                  onClick={() => {
                    deleteObject();
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
                    <path d="m 13 3 C 14 3 14 2 13 2 H 3 C 2 2 2 3 3 3 H 13 h -1 m 1 1 H 3 A 1 1 0 0 0 2 5 L 4 14 A 1 1 0 0 0 5 15 L 11 15 A 1 1 0 0 0 12 14 L 14 5 A 1 1 0 0 0 13 4 m -9 2 L 5 13 C 5 14 6 14 6 14 C 7 14 7 13 7 13 L 6 6 C 6 5 5 5 5 5 C 4 5 4 6 4 6 m 5 7 C 9 13 9 14 10 14 C 10 14 11 14 11 13 L 12 6 L 12 6 C 12 6 12 5 11 5 C 11 5 10 5 10 6 L 9 13" />
                  </svg>
                </Button>
              </div>
            </div>
            <div id="middle_container" style={{/*backgroundColor: "red", */width:'100%', height:'70%'}} className='border border-1 border-secondary'>
              <Split style={{ height: '100%', width: '100%',  border: "1px solid #d5d5d5", borderRadius: 3 }}>
                <div id="middle_object_tree_containter" 
                  style={{         
                    overflowX: "auto",
                    overflowY: "scroll",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    backgroundColor: "#d1cfcd",
                    // height: "100%",
                    verticalAlign: "top",
                    width: "20%",
                  }}
                >
                  <div className='border border-1 border-secondary'>
                    <ObjectTree
                      data_objects={MainJson}
                      changeTargetId={changeTargetId}
                      targetId={targetId}
                    />
                  </div>          
                  <div style={{ overflow: "scroll", height: "400px" }} className='border border-1 border-secondary'>
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
                <div id="middle_object_board_containter"
                  style={{
                    display: "inline-block",
                    height: "100%",
                    overflow: "scroll",
                    width: "65%",
                  }}
                >
                  <Board
                    grid={arrGrid}
                    data_objects={MainJson}
                    changeTargetId={changeTargetId}
                    changeTemplateJSON={changeTemplateJSON}
                    targetId={targetId}
                    selectedElems={selectedElems}
                    setSelectedElems={setSelectedElems}
                    selectionFrameSize={selectionFrameSize}
                    mouseMode={mouseMode}
                    addNewChildOnElement={addNewChildOnElement}
                    setOverTargetID={setOverTargetID}
                    changeTargetAddIdOnHeap={changeTargetAddIdOnHeap}
                  />
                </div>
                <div id="middle_object_dragable_element_containter"
                  style={{
                    display: "inline-block",
                    padding: "0px",
                    backgroundColor: "#FFFFE0",
                    height: "100%",
                    verticalAlign: "top",
                    width: "15%",
                  }}
                  className='border border-1 border-secondary'
                >
                  <CompanentPanel setMouseMode={setMouseMode} setNewItem={setNewItem} />
                </div>              
              </Split>
            </div>        
            <div id="bottom_container" style={{ height: "25%"}}>
                <div style={{ height: "10%"}} className='d-flex align-items-center border border-1'>
                  <Button id="bottom_container_button_selected_object"
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
                  <Button id="bottom_container_button_common_object"
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
                  <Button id="bottom_container_button_console_show"
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
                </div>
                <div style={{ height: "88%", backgroundColor:'green' }}>
                  {modeConsole === "TARGET"   && <Console data_objects={templateJSON} />}
                  {modeConsole === "MAIN"     && <Console data_objects={MainJson} />}
                  {modeConsole === "CONSOLE"  && <Console data_objects={JSON.parse(JSON.stringify(objectReverse(messageConsole), null, 4))}/>}
                </div>
                
                {/* {JSON.stringify(selectedHeapElems)} */}
                {/* <br /> */}
                {/* {JSON.stringify(selectedElems)} */}
            </div>
          </Split>
        </div>}
        {viewMode==='GENERATOR'&&<div id="generator_container" style={{width: "100%", height: '95%',}}>
            <Page_generator content={MainJson}/>
          </div>
        }
      
    </div>
  );
};

export default Page_Designer;
