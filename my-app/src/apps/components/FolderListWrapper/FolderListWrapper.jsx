import React, { useEffect, useState } from "react";

/*функция для создания папки или файла с привязкой к обрабочику объекта, что обеспечивает переход внуть папки или чтение файла*/
const FolderIcon = (
  elem,
  horizontalSize,
  kind,
  selectFolder,
  directories,
  readFileContent
) => {
  let label = elem?.name ?? "Без названия";
  if (kind === "revertButton") {
    // console.log('render->>>', directories)
    label = "Наверх";
  }
  return (
    <button
      style={{
        width: `${100 / horizontalSize}%`,
        height: "100%",
        borderStyle: "outset",
      }}
      onClick={() => {
        if (kind === "directory") {
          /*Перемещение во вложенную деректорию по текущего обработчика*/
          selectFolder(elem);
        } else if (kind === "revertButton") {
          /*Перемещение в другую деректорию по обработчику из списка уже посещенных директорий*/
          selectFolder(null, null, null, null, null, null, null, null, "back");
        } else if (kind === "file") {
          /*Прочтение содержимого файла*/
          // let targetHandler = directories[directories.length-2];
          readFileContent(elem);
          // setTargetFile(elem)
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
        style={{ display: `${horizontalSize === 1 ? "inline" : ""}` }}
      >
        {kind === "revertButton" && (
          <path d="M 55 410 H 350 C 535 412 522 162 350 160 H 85 L 120 125 C 135 110 115 90 100 105 L 65 140 C 45 160 45 185 65 205 L 100 245 C 115 260 135 240 120 225 L 85 185 H 350 C 485 193 507 379 350 385 H 54.914 C 35 385 35 410 55 410" />
        )}
        {kind === "directory" && (
          <path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z" />
        )}
        {kind === "file" && (
          <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
        )}
      </svg>
      <div
        style={{
          overflow: "hidden" /* Обрезаем все, что не помещается в область */,
          "white-space": "nowrap" /* Запрещаем перенос строк */,
          "text-overflow":
            "ellipsis" /* Обрезаем текст и к концу строки добавляем многоточие */,
          // 'margin-left': '0.5rem'
          display: `${horizontalSize === 1 ? "inline" : ""}`,
        }}
        title={`${
          kind === "revertButton" ? "Перейти вверх по директории" : label
        }`}
      >
        {`${kind === "directory" ? " " + label : label}`}
      </div>
    </button>
  );
};

function GetListFolderAndFiles(
  size,
  folders,
  files,
  selectFolder,
  directories,
  readFileContent
) {
  // console.log('folders->>',folders)
  // console.log('files->>',files)
  // console.log('directories->>',directories)
  // console.log('directories.length->>',directories?.length)
  console.log(
    "directories.flag ",
    directories?.length !== 1 && !!directories?.length
  );
  let List = []; // итоговая список для отображения
  let counterLine = 0; // счетчик строк
  let ListFolderAndLists = [].concat(folders, files); // список обработчиков из которого составляется список для отображения
  let lenList = ListFolderAndLists.length ?? 0;
  let horizontalSize = size["horizontalSize"];
  // let horizontalSize = 3;
  let lineInCounter = 0; // счетчик элементов в строке
  // console.log('lenList->',lenList)
  let vLine;
  let vListTMP = [];
  if (!(directories?.length === 1) && directories) {
    /*создаем или нет первую кнопку "revert" для не первой папки*/
    vListTMP.push(
      FolderIcon(
        null,
        horizontalSize,
        "revertButton",
        selectFolder,
        directories
      )
    );
    lineInCounter++;
  }
  if (lineInCounter === horizontalSize) {
    /*если требуется создаем линию*/
    vLine = (
      <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
        {vListTMP.map((elem) => elem)}
      </div>
    );
    List.push(vLine);
    vListTMP = [];
    counterLine++;
    lineInCounter = 0;
  }
  ListFolderAndLists.forEach((listElem, index) => {
    /*по списку файлов и папок создаем значки, объединеяя в линии*/
    vListTMP.push(
      FolderIcon(
        listElem,
        horizontalSize,
        listElem.kind,
        selectFolder,
        null,
        readFileContent
      )
    );
    lineInCounter++;
    if (lineInCounter === horizontalSize) {
      vLine = (
        <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
          {vListTMP.map((elem) => elem)}
        </div>
      );
      List.push(vLine);
      vListTMP = [];
      counterLine++;
      lineInCounter = 0;
    }
    if (index === ListFolderAndLists.length - 1 && vListTMP) {
      vLine = (
        <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
          {vListTMP.map((elem) => elem)}
        </div>
      );
      List.push(vLine);
      vListTMP = [];
      counterLine++;
      lineInCounter = 0;
    }
  });
  if (vListTMP) {
    /*нужно для случая когда в папке нет ничего, потому как линия еще не добавилась*/
    vLine = (
      <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
        {vListTMP.map((elem) => elem)}
      </div>
    );
    List.push(vLine);
    vListTMP = [];
    counterLine++;
    lineInCounter = 0;
  }
  return List.map((elem) => (
    <div style={{ height: "10%" }}>
      {elem}
      <br />
    </div>
  ));
}

const FolderListWrapper = (props) => {
  const [size, setSize] = useState(
    props["size"] ?? { vertiacalSize: 4, horizontalSize: 4 }
  );
  const [folderHandler, setFolderHandler] = useState(
    props["folderHandler"] ?? null
  );
  const [filesHandler, setFilsHandler] = useState(
    props["nestedFilesHandlers"] ?? null
  );
  const [foldersHandler, setFoldersHandler] = useState(
    props["nestedFoldersHandlers"] ?? null
  );
  useEffect(() => {
    setSize(props["size"] ?? { vertiacalSize: 4, horizontalSize: 4 });
    setFolderHandler(props["folderHandler"] ?? null);
    setFilsHandler(props["nestedFilesHandlers"] ?? null);
    setFoldersHandler(props["nestedFoldersHandlers"] ?? null);
  }, [props]);
  return (
    <div
      className="flex-1 p-1"
      style={{
        borderColor: "#f0ffff",
        backgroundColor: "#f0ffff",
        borderStyle: "groove",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
      }}
    >
      {GetListFolderAndFiles(
        size,
        foldersHandler,
        filesHandler,
        props.selectFolder,
        props.directories,
        props.readFileContent,
        props.setTargetFile
      )}
    </div>
  );
};

export default FolderListWrapper;
