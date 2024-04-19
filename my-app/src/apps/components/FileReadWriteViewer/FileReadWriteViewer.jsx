import React, { useEffect, useState } from "react";
import { FolderListWrapper } from "../../components";
// import { FolderListWrapper} from "../../../components";
// import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";

import styles from './FileReadWriteViewer.module.css';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import Split from "@uiw/react-split";

import { EditorView } from "@codemirror/view";

import {
  // color_ColorMain,
  color_ColorSecondaryA,
  color_ColorSecondaryB,
  // color_ColorAdditional
} from '../../../config'

const FileReadWriteViewer = (props) => {
  // const MainJson = data_objects

  const [fileContent, setFileContent] = useState(null);
  const [Directory, setDirectory] = useState(null);
  const [Directories, setDiretories] = useState(null);
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [fileHandle, setFileHandle] = useState(null);
  const [file, setFile] = useState(null);
  const [targetFile, setTargetFile] = useState([]);
  const [targetFileContent, setTargetFileContent] = useState("");
  const [smartTabs, setSmartTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);

  // fileHandle is an instance of FileSystemFileHandle..
  async function writeFile(targetFileHandle, contents) {
    console.log(targetFileHandle);
    // Create a FileSystemWritableFileStream to write to.
    const writable = await targetFileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();

    
    const file = await targetFileHandle.getFile();
    const readcontents = await file.text();
    console.log("readcontents->>", readcontents);
    setFileHandle(targetFileHandle);
    setTargetFile(file);
    setTargetFileContent(contents);
  }

  const writeFileHandler = async () => {
    console.log(fileHandle);
    // writeFile(fileHandle, "asd");
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(
      "123123ASDFASDFXZCVZXCVASDFAGDFGHRTEYERTWQWERSDGSDFGSD"
    );
    // Close the file and write the contents to disk.
    await writable.close();
  };

  const readFileContent = async (fileHandle) => {
    const file = await fileHandle.getFile();
    const contents = await file.text();
    console.log("contents->>", contents);
    setFileHandle(fileHandle);
    setTargetFile(file);
    setTargetFileContent(contents);
  };

  const setNewFolder = async (
    argDirectoryHandler,
    argSetDirectory,
    argSetFiles,
    argSetFolders,
    argSetDiretories
  ) => {
    // console.log("1-1")
    const vFiles = [];
    const vFolders = [];
    let vSmartTabs = smartTabs??[].concat(smartTabs);
    // console.log("CurrentTab->>>", currentTab)
    let vCurrentTab = (currentTab||currentTab===0)?(currentTab+1):0;
    // console.log("vCurrentTab->>>", vCurrentTab)
    let vfiles2=[];
    let vfolders2=[];
    for await (const entry of argDirectoryHandler.values()) {
      if (entry.kind === "file") {
        vfiles2.push(entry);
      } else if (entry.kind === "directory") {
        vfolders2.push(entry);
      }
    }
   
    // console.log("vSmartTabs");
    // vSmartTabs = vSmartTabs.push
    let vDirectories = Directories ?? [];
    vSmartTabs = vSmartTabs.concat({
      Directory:argDirectoryHandler,
      Directories:[].concat(Directories),
      files:vfiles2,
      folders:vfolders2,
      name:argDirectoryHandler.name
    });    
    console.log(vSmartTabs);
    setSmartTabs(vSmartTabs);
    setCurrentTab(vCurrentTab);
    // console.log("Файлы и папки в папке↓↓↓↓");
    selectFolder(
      argDirectoryHandler,
      argSetDirectory,
      argSetFiles,
      argSetFolders,
      argSetDiretories,
      vFiles,
      vFolders,
      vDirectories
    );            
  };

  const selectFolder = async (
    argDirectoryHandler,
    argSetDirectory,
    argSetFiles,
    argSetFolders,
    argSetDiretories,
    argFlies,
    argFolders,
    argDirectories,
    command
  ) => {
    console.log(selectFolder)
    // console.log("vFiles->>",argFlies)
    // console.log("vFolders->>",argFolders)
    // console.log('argDirectoryHandler->>',argDirectoryHandler)
    // console.log('!!!!selectFolder argDirectories->>',argDirectories)
    let vSmartTabs = [].concat(smartTabs);
    let vTab = vSmartTabs[currentTab]
    console.log(11111)
    if (command) {
      if (command === "back") {
        const directories = Directories.slice(0, -1) ?? Directories[0];
        let targetDirectory = directories[directories.length - 1];
        // console.log('targetDirectory->>',targetDirectory)
        const flies = [];
        const folders = [];
        for await (const entry of targetDirectory.values()) {
          if (entry.kind === "file") {
            flies.push(entry);
          } else if (entry.kind === "directory") {
            folders.push(entry);
          }
        }
        setFiles(flies);
        setFolders(folders);
        setDirectory(targetDirectory);        
        // vTab['DirectoryHandler'] = structuredClone(targetDirectory);        
        // vTab['Directories'] = structuredClone(directories);
        // vTab['files'] = structuredClone(files);
        // vTab['folders'] = structuredClone(folders);
        setDiretories(directories);
        let vCurrentTab = currentTab;
        let vSmartTabs = smartTabs??[];
        if(vCurrentTab || vCurrentTab===0) {
          vSmartTabs[vCurrentTab]['name']=targetDirectory.name;
        }
        else {
          vSmartTabs = vSmartTabs.concat({
            Directory:targetDirectory,
            name:targetDirectory.name,
            Directories:[].concat(directories),
            files:files,
            folders:folders
          });
          setSmartTabs(vSmartTabs);
          // setCurrentTab(0);
        }
      }
    } else {
      const flies = argFlies ?? [];
      const folders = argFolders ?? [];
      const directories = argDirectories ?? Directories ?? [];
      for await (const entry of argDirectoryHandler.values()) {
        if (entry.kind === "file") {
          flies.push(entry);
        } else if (entry.kind === "directory") {
          folders.push(entry);
        }
      }
      directories.push(argDirectoryHandler);
      argSetDirectory
        ? argSetDirectory(argDirectoryHandler)
        : setDirectory(argDirectoryHandler);
      argSetFiles ? argSetFiles(flies) : setFiles(flies);
      argSetFolders ? argSetFolders(folders) : setFolders(folders);
      console.log('argDirectoryHandler')
      console.log(argDirectoryHandler)
      argSetDiretories
        ? argSetDiretories(directories)
        : setDiretories(directories);
        let vCurrentTab = currentTab;
        let vSmartTabs = smartTabs??[];
        if(vCurrentTab || vCurrentTab===0) {
          vSmartTabs[vCurrentTab]['name']=argDirectoryHandler.name;
          vSmartTabs[vCurrentTab]['Directory']=argDirectoryHandler;
          vSmartTabs[vCurrentTab]['Directories']=directories;
          vSmartTabs[vCurrentTab]['files']=flies;
          vSmartTabs[vCurrentTab]['folders']=folders;
        }
        else {
          vSmartTabs = vSmartTabs.concat({
            Directory:argDirectoryHandler,
            name:argDirectoryHandler.name,
            Directories:[].concat(directories),
            files:files,
            folders:folders
          });
          setSmartTabs(vSmartTabs);
          // setCurrentTab(0);
        }
        // [vCurrentTab]['name'] = argDirectoryHandler.name;
        // console.log(argDirectoryHandler.name)
        // console.log(vSmartTabs)
        // setSmartTabs(vSmartTabs)
        
        // vTab['DirectoryHandler'] = structuredClone(argDirectoryHandler);        
        // vTab['Directories'] = structuredClone(directories);
        // vTab['files'] = structuredClone(flies);
        // vTab['folders'] = structuredClone(folders);
    }    
    console.log(22222)
    // vSmartTabs[currentTab] = structuredClone(vTab);
    console.log(vSmartTabs);
    // setSmartTabs(vSmartTabs);
  };

  const openFile = async () => {
    let [fileHandle] = await window.showOpenFilePicker();
    openSpecificFile(fileHandle);
    // const file = await fileHandle.getFile();
    // console.log("file->>", file);
    // const contents = await file.text();
    // console.log("contents->>", contents);
    // setFileHandle(fileHandle);
    // setFile(file);
    // setFileContent(contents);
  };

  const openSpecificFile = async (fileHandle) => {
    setFileHandle(null);
    setTargetFile(null);
    setTargetFileContent(null);
    const file = await fileHandle.getFile();
    console.log("file->>", file);
    console.log("fileHandle->>", fileHandle);
    const contents = await file.text();
    console.log("contents->>", contents);
    setFileHandle(fileHandle);
    setTargetFile(file);
    setTargetFileContent(contents);
    // setFile(file);
    // setFileContent(contents);
  };

  const createFile = async () => {
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
  };

  const doubleTab = async ()=>{    
    /*Дублирование вкладки и работа уже в ней*/
    // const vFiles = filse;
    // const vFolders = [];
    let vSmartTabs = [].concat(smartTabs);
    let vTab = vSmartTabs[currentTab]
    let vNextTab = vSmartTabs.length; 
    vTab['Directory'] = structuredClone(Directory);
    vTab['Directories'] = structuredClone(Directories);
    vTab['files'] = structuredClone(files);
    vTab['folders'] = structuredClone(folders);
    // vSmartTabs[currentTab] = structuredClone(vTab);
    vSmartTabs[vNextTab] = structuredClone(vTab);
    console.log("vSmartTabs")
    console.log(vSmartTabs);
    setSmartTabs(vSmartTabs);
    setCurrentTab(vNextTab);
  }

  const openFolder = async () => {
    const directoryHandle = await window.showDirectoryPicker();
    await setNewFolder(
      directoryHandle,
      setDirectory,
      setFiles,
      setFolders,
      setDiretories
    );
  }

   return (
    <div
      style={{ display: "flex", width: "100%", height: "100%", overflow: "hidden"}}
      className="d-flex flex-row "
    >
      <div style={{ height: "100%", display: "inline-block", width: "400px"}} className='d-flex flex-column align-items-stretch'>
        <button
          className="btn"
          style={{
            margin:'1px',
            backgroundColor:color_ColorSecondaryA["color4"]
          }}
          onClick={openFolder}
        >
          Выберите папку
        </button>
        <button 
          className="btn"
          style={{
            margin:'1px',
            backgroundColor:color_ColorSecondaryA["color4"]
          }}
        >Создать шаблонные файлы</button>
        <div>
          {smartTabs.map((element,index) => {
            return  <button
                      style={{
                        margin: "2px",
                        backgroundColor:(index===currentTab?color_ColorSecondaryB["color1"]:color_ColorSecondaryB["color5"])
                      }}
                      className='btn'
                      onClick={()=>{
                        console.log('index->>',index)
                        let vTab = {...smartTabs[index]};
                        console.log(vTab)
                        setFiles(structuredClone(vTab['files']));
                        setFolders(structuredClone(vTab['folders']));
                        setDirectory(structuredClone(vTab['Directory']));
                        setDiretories(structuredClone(vTab['Directories']));
                        setCurrentTab(index)
                      }}
                    >
                      {element.name}
                    </button>
          })}
          <button 
            style={{
              margin: "2px",
              backgroundColor:color_ColorSecondaryA["color5"]
            }}
            className="btn"
            disabled={(currentTab||currentTab===0)?false:true}
            onClick={doubleTab}
          >+</button>
        </div>        
        <div>
          <input 
            className='w-100'
            value={`Путь: ${Directories?.map((elem) => elem.name).join("/") ??"Папка не выбрана"}`}/>
        </div>
        <FolderListWrapper
          size={{ vertiacalSize: 3, horizontalSize: 1 }}
          folderHandler={Directory}
          directories={Directories}
          nestedFoldersHandlers={folders}
          selectFolder={selectFolder}
          nestedFilesHandlers={files}
          // setTargetFile={setTargetFile}
          setTargetFile={openSpecificFile}
          setTargetFileContent={setTargetFileContent}
          readFileContent={readFileContent}
        />
      </div>
      <div style={{ display: "inline-block"}} className="w-75 h-100 d-flex flex-column flex-fill">
        <div>
          <button onClick={openFile}> Открытие файла </button>
          <button onClick={createFile}> Создать файл </button>
          <button
            onClick={
              /*writeFileHandler*/ () => {
                console.log(props.content);
                if(props.content) {
                  console.log('write content fileHandle',fileHandle)
                  writeFile(fileHandle, props.content);
                  // openSpecificFile(fileHandle);
                }
                else {
                  writeFile(fileHandle, targetFileContent);                
                  // openSpecificFile(fileHandle);
                }
              }
            }
          >
            {" "}
            Записать в файл{" "}
          </button>
          <button onClick={()=>{
            setTargetFileContent("")
            setTargetFile([])
            setFile(null)
            setFileHandle(null)
          }}>Закрыть файл</button>
        </div>
        <div>
          <button>1</button>
        </div>
        <input className='w-100' value={`Выбранный файл: ${targetFile?.name ?? "Не выбран"}`}></input>
        <div className={`${styles['cm-codeeditorcontainer']}`}>
            <CodeMirror 
              className={`${styles['cm-codeeditor']}`}
              style={!(targetFileContent ?? fileContent ?? "")?{width:"100%"}:{}}
              value={targetFileContent ?? fileContent ?? ""}               
              extensions={[javascript({ jsx: true })]}/>
        </div>
      </div>
    </div>
  );
};

export default FileReadWriteViewer;
