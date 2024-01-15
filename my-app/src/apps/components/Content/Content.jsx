import { React } from "react";

// import styles from './Content.module.css'

// import { Button } from 'bootstrap';

// const RenderContent=(render_object,changeSelectedID)=>{

import ResizableBox from "../ResizableBox";
import Table from "../Table";

const getChildren = (
  children,
  changeSelectedID,
  targetId,
  selectedElems,
  selectionFrameSize,
  mouseMode,
  addNewChildOnElement,
  setOverTargetID,
  changeTemplateJSON
) => {
  if (Object.hasOwn(children, "children")) {
    return children.children.map((item) => (
      <Content
        data_objects={item}
        changeTargetId={changeSelectedID}
        targetId={targetId}
        selectedElems={selectedElems}
        selectionFrameSize={selectionFrameSize}
        mouseMode={mouseMode}
        addNewChildOnElement={addNewChildOnElement}
        setOverTargetID={setOverTargetID}
        changeTemplateJSON={changeTemplateJSON}
      />
    ));
  }
  return ``;
};

const getStyle = (object, selectedElem, selectedElems) => {
  let style = {};
  if (Object.hasOwn(object, "style")) {
    Object.keys(object.style).forEach((styleprop) => {
      style[styleprop] = object.style[styleprop];
      style["opacity"] = "0.9";
    });
  }
  if (selectedElem || selectedElems?.includes(object.id)) {
    style["borderStyle"] = style["borderStyle"] ?? "solid";
    style["borderColor"] = style["borderColor"] ?? "#ff7a7a";
    style["borderWidth"] = style["borderWidth"] ?? "1px";
  } else {
    style["borderStyle"] = "solid";
    style["borderColor"] = "#ffffff";
    style["borderWidth"] = "1px";
  }
  return style;
};

const checkObject = (obj) => {
  let check = true;
  if (!Object.hasOwn(obj, "tag")) {
    console.log('Ошибка обработки: отсутствует атрибут "tag"');
    check = false;
  }
  if (!Object.hasOwn(obj, "id")) {
    console.log('Ошибка обработки: отсутствует атрибут "id"');
    check = false;
  }
  return check;
};

const Content = (props) => {
  const RenderContent = (
    render_object,
    changeSelectedID,
    selectionFrameSize
  ) => {
    let elem;
    let style = getStyle(
      render_object,
      render_object.id === props.targetId,
      props.selectedElems
    );
    if (checkObject) {
      switch (String(render_object.tag).toLowerCase()) {
        case "div":
          elem = (
            <div
              id={render_object.id}
              key={Math.floor(Math.random() * 2000)}
              style={style}
              onDoubleClick={(event) => {
                console.log('123123123')
                event.stopPropagation();
                changeSelectedID(event.target.id, event.currentTarget);
              }}
              onMouseOver={(event) => {
                event.stopPropagation();
                props.setOverTargetID(render_object.id);
              }}
              onMouseUp={(event) => {
                if (props.mouseMode === "MOVENEWITEM")
                  props.addNewChildOnElement(event);
              }}
            >
              {render_object.content ?? ``}
              {getChildren(
                render_object,
                changeSelectedID,
                props.targetId,
                props.selectedElems,
                selectionFrameSize,
                props.mouseMode,
                props.addNewChildOnElement,
                props.setOverTargetID,
                props.changeTemplateJSON
              )}
            </div>
          );
          break;
        case "button":
          elem = (
            <button
              id={render_object.id}
              // key = {render_object.id}
              key={Math.floor(Math.random() * 2000)}
              style={style}
              onClick={(event) => {
                event.stopPropagation();
                changeSelectedID(event.target.id, event.currentTarget);
              }}
            >
              {render_object.content ?? ``}
              {getChildren(
                render_object,
                changeSelectedID,
                props.targetId,
                props.selectedElems,
                selectionFrameSize,
                props.mouseMode,
                props.addNewChildOnElement,
                props.setOverTargetID,
                props.changeTemplateJSON
              )}
            </button>
          );
          break;
        case "table":
          if (Object.hasOwn(render_object, "model")) {
            elem = (
              <div
                className="ag-theme-alpine"
                id={render_object.id}
                style={style}
                onClick={(event) => {
                  event.stopPropagation();
                  changeSelectedID(event.currentTarget.id, event.currentTarget);
                }}
              >
                <div
                  style={{
                    width: style.width,
                    height: style.height,
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                  }}
                >
                  {Table(render_object)}
                </div>
                {props.data_objects.id === props.targetId && (
                  <div
                    style={{
                      background: "red",
                      width: style.width,
                      height: style.height,
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      "z-index": 33,
                      opacity: 0.33,
                    }}
                  ></div>
                )}
              </div>
            );
          } else
            elem = (
              <div
                className="ag-theme-alpine"
                id={render_object.id}
                style={style}
                onClick={(event) => {
                  event.stopPropagation();
                  changeSelectedID(event.currentTarget.id, event.currentTarget);
                }}
              >
                <div
                  style={{
                    width: style.width,
                    height: style.height,
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                  }}
                >
                  {Table(render_object)}
                </div>
                {props.data_objects.id === props.targetId && (
                  <div
                    style={{
                      background: "red",
                      width: style.width,
                      height: style.height,
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      "z-index": 33,
                      opacity: 0.33,
                    }}
                  ></div>
                )}
              </div>
            );
          break;

        case "input":
          elem = (
            <input
              id={render_object.id}
              style={style}
              defaultValue={render_object.content ?? ""}
              onClick={(event) => {
                event.stopPropagation();
                changeSelectedID(event.currentTarget.id, event.currentTarget);
              }}
            />
          );
          break;
        case "label":
          elem = (
            <p
              id={render_object.id}
              style={style}
              onClick={(event) => {
                event.stopPropagation();
                changeSelectedID(event.currentTarget.id, event.currentTarget);
              }}
            >
              {render_object.content ?? ""}
            </p>
          );
          break;
        default:
          break;
      }
    }
    return elem;
  };
  let elem = RenderContent(
    props.data_objects,
    props.changeTargetId,
    props.selectionFrameSize
  );
  let style;
  if (props.data_objects.id === props.targetId)
    style = {
      position: "absolute",
      borderStyle: "solid",
      borderColor: "#ff0000 ",
      borderWidth: "1px ",
      top: props.data_objects.style.top,
      left: props.data_objects.style.left,
      width: props.selectionFrameSize.width,
      height: props.selectionFrameSize.height,
    };
  return (
    <div>
      {props.data_objects.id === props.targetId &&
        props.data_objects.id !== "main_object" &&
        (props.mouseMode === "RESIZE" ? (
          <ResizableBox
            data_objects={props.data_objects}
            style={style}
            changeTemplateJSON={props.changeTemplateJSON}
          />
        ) : 
            props.mouseMode === "HANDLE" ? 
                <div style={props.data_objects.style} />
                : 
                ``
        )
       }
      {elem}
    </div>
  );
};

export default Content;
