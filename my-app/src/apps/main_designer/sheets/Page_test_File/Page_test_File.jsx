import React, { useEffect, useState } from "react";

import { FileReadWriteViewer } from "../../../components";


// import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";

const Page_test_File = () => {
  // const MainJson = data_objects
  // const [fileHandle, setFileHandle] = useState(null); 
  // const [file, setFile] = useState(null);
  // const [fileContent, setFileContent] = useState(null);
  // const [Directory, setDirectory] = useState(null);
  // const [Directories, setDiretories] = useState(null)
  // const [files, setFiles] = useState([]);
  // const [folders, setFolders] = useState([]);
  // const [targetFile, setTargetFile] = useState([]);
  // const [targetFileContent, setTargetFileContent] = useState("");

  // // fileHandle is an instance of FileSystemFileHandle..
  // async function writeFile(targetFileHandle, contents) {
  //   console.log(targetFileHandle);
  //   // Create a FileSystemWritableFileStream to write to.
  //   const writable = await targetFileHandle.createWritable();
  //   // Write the contents of the file to the stream.
  //   await writable.write(contents);
  //   // Close the file and write the contents to disk.
  //   await writable.close();
  // }

  

  // const writeFileHandler = async () => {
  //   console.log(fileHandle);
  //   // writeFile(fileHandle, "asd");
  //   const writable = await fileHandle.createWritable();
  //   // Write the contents of the file to the stream.
  //   await writable.write('123123ASDFASDFXZCVZXCVASDFAGDFGHRTEYERTWQWERSDGSDFGSD');
  //   // Close the file and write the contents to disk.
  //   await writable.close();
  // }

  // const readFileContent = async(fileHandle)=>{
  //   const file = await fileHandle.getFile();
  //   const contents = await file.text();
  //   console.log('contents->>',contents)
  //   setFileHandle(fileHandle);    
  //   setTargetFile(file)
  //   setTargetFileContent(contents)
    
  // }

  // const setNewFolder = async (
  //   argDirectoryHandler,
  //   argSetDirectory,
  //   argSetFiles,
  //   argSetFolders,
  //   argSetDiretories
  // ) => {
  //   const vFiles = [];
  //   const vFolders = [];
  //   let vDirectories = Directories??[];
  //   // console.log("Файлы и папки в папке↓↓↓↓");
  //   selectFolder(argDirectoryHandler,
  //     argSetDirectory,
  //     argSetFiles,
  //     argSetFolders,
  //     argSetDiretories,
  //     vFiles,
  //     vFolders,
  //     vDirectories
  //     )    
  // };

  // const selectFolder = async (  argDirectoryHandler,
  //   argSetDirectory,
  //   argSetFiles,
  //   argSetFolders,
  //   argSetDiretories,
  //   argFlies,
  //   argFolders,
  //   argDirectories,
  //   command
  //   )=>{
  //     // console.log("vFiles->>",argFlies)
  //     // console.log("vFolders->>",argFolders)
  //     // console.log('argDirectoryHandler->>',argDirectoryHandler)
  //     // console.log('!!!!selectFolder argDirectories->>',argDirectories)      
  //     if(command) {
  //       if(command==='back'){
  //         const directories = Directories.slice(0,-1)??Directories[0];
  //         let targetDirectory = directories[directories.length-1]
  //         // console.log('targetDirectory->>',targetDirectory)          
  //         const flies = [];
  //         const folders = [];
  //         for await (const entry of targetDirectory.values()) {
  //           if (entry.kind === "file") {
  //             flies.push(entry);
  //           } else if (entry.kind === "directory") {
  //             folders.push(entry);
  //           }
  //         }
  //         setFiles(flies)
  //         setFolders(folders);
  //         setDirectory(targetDirectory);
  //         setDiretories(directories);
  //       }
  //     }
  //     else {
  //       const flies = argFlies ??[];
  //       const folders = argFolders ?? [];
  //       const directories = argDirectories ?? Directories ?? [];
  //       for await (const entry of argDirectoryHandler.values()) {
  //         if (entry.kind === "file") {
  //           flies.push(entry);
  //         } else if (entry.kind === "directory") {
  //           folders.push(entry);
  //         }
  //       }
  //       directories.push(argDirectoryHandler);
  //       argSetDirectory ? argSetDirectory(argDirectoryHandler) : setDirectory(argDirectoryHandler);
  //       argSetFiles ? argSetFiles(flies) : setFiles(flies)
  //       argSetFolders ? argSetFolders(folders) : setFolders(folders);
  //       argSetDiretories ? argSetDiretories(directories) : setDiretories(directories);
  //     }      
  // }

  // const openFile = async () => {
  //   let [fileHandle] = await window.showOpenFilePicker();
  //   openSpecificFile(fileHandle)
  //   // const file = await fileHandle.getFile();
  //   // console.log("file->>", file);
  //   // const contents = await file.text();
  //   // console.log("contents->>", contents);
  //   // setFileHandle(fileHandle);
  //   // setFile(file);
  //   // setFileContent(contents);
  // }

  // const openSpecificFile = async (fileHandle) => {
  //   const file = await fileHandle.getFile();
  //   console.log("file->>", file);
  //   console.log("fileHandle->>", fileHandle);
  //   const contents = await file.text();
  //   console.log("contents->>", contents);
  //   setFileHandle(fileHandle);    
  //   setTargetFile(file)
  //   setTargetFileContent(contents)
  //   // setFile(file);
  //   // setFileContent(contents);
  // }

  

  // const createFile = async () => {
  //   const options = {
  //     types: [
  //       {
  //         description: "Text Files",
  //         accept: {
  //           "text/plain": [".txt"],
  //         },
  //       },
  //     ],
  //   };
  //   const handle = await window.showSaveFilePicker(options);
  //   setFileHandle(handle);
  // }

  return <FileReadWriteViewer/>
    // <div style={{ /*display: "inline-block",*/ width: "400px", height: "500px" }}>
    //   <div className="flex-1" style={{ height: "100%" }}>
    //     <div style={{ width: "100%", height: "100%" }}>
    //       <button
    //         onClick={async () => {
    //           const directoryHandle = await window.showDirectoryPicker();
    //           await setNewFolder(
    //             directoryHandle,
    //             setDirectory,
    //             setFiles,
    //             setFolders,
    //             setDiretories
    //           );
    //         }}
    //       >
    //         Выберите папку
    //       </button>
    //       Путь: {Directories?.map(elem=>elem.name).join('/')??'Папка не выбрана'}
    //       <div style={{width:"100%", height:'90%'}}>
    //         <FolderListWrapper
    //           size={{ vertiacalSize: 3, horizontalSize: 2}}
    //           folderHandler={Directory}
    //           directories={Directories}
    //           nestedFoldersHandlers={folders}
    //           selectFolder={selectFolder}
    //           nestedFilesHandlers={files}
    //           // setTargetFile={setTargetFile}              
    //           setTargetFile={openSpecificFile}              
    //           setTargetFileContent={setTargetFileContent}
    //           readFileContent={readFileContent}
    //         />
    //       </div>
    //     </div>
        
    //   </div>
    //   <div>
    //     <button onClick={openFile} >          Открытие файла  </button>
    //     <button onClick={createFile} >        Создать файл    </button>
        
    //     <br />
    //     Выбранный файл: {targetFile?.name ?? "Не выбран"} 
    //     <br />
    //     {fileContent}
    //     <div>
    //       <CodeEditor
    //         value={targetFileContent??fileContent??""}
    //         // ref={textRef}
    //         language="js"
    //         placeholder="Please enter JS code."
    //         // onChange={(evn) => setRenderClass(evn.target.value)}
    //         onChange={(event) => {
    //           setTargetFileContent(event.target.value);
    //         }}
    //         padding={40}
    //         style={{
    //           fontFamily:
    //             "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
    //           fontSize: 12,
    //         }}
    //       />
    //       <textarea
    //         id="fileContent"
    //         value={targetFileContent??fileContent??""}
    //         onChange={(event) => {
    //           setTargetFileContent(event.target.value);
    //         }}
    //       />
    //     <button onClick={/*writeFileHandler*/ ()=>{writeFile(fileHandle,targetFileContent)}} >  Записать в файл </button>
    //     </div>
    //   </div>
    // </div>
  // );
};

export default Page_test_File;
