import React, { useEffect, useState } from "react";

import { FolderListWrapper } from "../../../components";

const Page_test_File = () => {
  // const MainJson = data_objects
  const [fileHandle, setFileHandle] = useState(null);
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [Directory, setDirectory] = useState(null);
  const [Directories, setDiretories] = useState(null)
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [targetFile, setTargetFile] = useState([]);
  const [targetFileContent, setTargetFileContent] = useState("");

  // fileHandle is an instance of FileSystemFileHandle..
  async function writeFile(targetFileHandle, contents) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await targetFileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }

  const setNewFolder = async (
    argDirectoryHandler,
    argSetDirectory,
    argSetFiles,
    argSetFolders,
    argSetDiretories
  ) => {
    // console.log("Файлы и папки в папке↓↓↓↓");
    for await (const entry of argDirectoryHandler.values()) {
      // const file = await entry.getFile();
      // const contents = await file.text();
      // console.log('entry->>',entry.kind, entry.name);
    }
    // console.log("Файлы в папке↑↑↑↑");
    // const promises = [];
    let vFiles = [];
    let vFolders = [];
    let vDirectories = Directories;
    for await (const entry of argDirectoryHandler.values()) {
      // console.log('entry->>',entry)
      // if (entry.kind !== 'file') {
      //   continue;
      // }
      // promises.push(entry.getFile().then((file) => `${file.name} (${file.size})`));
      if (entry.kind === "file") {
        vFiles.push(entry);
        // promises.push(entry.getFile().then((file) => file));
      } else if (entry.kind === "directory") {
        vFolders.push(entry);
        // promises.push(entry.getDirectory .then((file) => file));
      }
    }
    // console.log("vFiles->>",vFiles)
    // console.log("vFolders->>",vFolders)
    vDirectories.push(argDirectoryHandler);
    argSetDirectory(argDirectoryHandler);
    argSetFiles(vFiles);
    argSetFolders(vFolders);
    argSetDiretories(vDirectories)
  };

  return (
    <div style={{ display: "inline-block", width: "1000px", height: "700px" }}>
      <div className="flex-1" style={{ height: "100%" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <button
            onClick={async () => {
              const directoryHandle = await window.showDirectoryPicker();
              await setNewFolder(
                directoryHandle,
                setDirectory,
                setFiles,
                setFolders
              );
            }}
          >
            Выберите папку
          </button>
          <FolderListWrapper
            size={{ vertiacalSize: 3, horizontalSize: 3 }}
            folderHandler={Directory}
            nestedFoldersHandlers={folders}
            nestedFilesHandlers={files}
            setTargetFile={setTargetFile}
            setTargetFileContent={setTargetFileContent}
          />
        </div>
        <div>
          Directory : {Directory?.name ?? "Не выбран"}
          <textarea
            id="fileContent"
            value={targetFileContent ?? ""}
            onChange={(event) => {
              setTargetFileContent(event.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <button
          onClick={async () => {
            let [fileHandle] = await window.showOpenFilePicker();
            const file = await fileHandle.getFile();
            console.log("file->>", file);
            const contents = await file.text();
            console.log("contents->>", contents);
            setFileHandle(fileHandle);
            setFile(file);
            setFileContent(contents);
          }}
        >
          Открытие файла
        </button>
        <button
          onClick={async () => {
            const options = {
              types: [
                {
                  description: "Text Files",
                  accept: {
                    "text/plain": [".txt"],
                  },
                },
              ],
            };
            const handle = await window.showSaveFilePicker(options);
            setFileHandle(handle);
          }}
        >
          Создать файл
        </button>
        <button
          onClick={() => {
            console.log(fileHandle);
            writeFile(fileHandle, "asd");
            // const writable = await fileHandle.createWritable();
            // // // Write the contents of the file to the stream.
            // await writable.write('123123ASDFASDFXZCVZXCVASDFAGDFGHRTEYERTWQWERSDGSDFGSD');
            // // // Close the file and write the contents to disk.
            // await writable.close();
          }}
        >
          Записать в файл
        </button>
        <br />
        Выбранный файл: {targetFile?.name ?? "Не выбран"}
        <br />
        {fileContent}
        <br />
        <button
          onClick={async () => {
            const directoryHandle = await window.showDirectoryPicker();
            await setNewFolder(
              directoryHandle,
              setDirectory,
              setFiles,
              setFolders,
              setDiretories
            );
          }}
        >
          Выберите папку
        </button>
        {/* {files.map(
            (fileElem)=>{
              return  <button onClick={async ()=>{
                          const file = await fileElem.getFile();
                          const contents = await file.text();
                          console.log('contents->>',contents)
                          setTargetFile(file)
                          setTargetFileContent(contents)
                        }}
                      >
                          {fileElem.name}
                      </button>
            })
          } */}
        <br />
        <br />
      </div>
    </div>
  );
};

export default Page_test_File;
