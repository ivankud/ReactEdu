import React , { useEffect, useState } from "react";

  const Page_test_File = () => {
    // const MainJson = data_objects
    const [fileHandle, setFileHandle] = useState(null)
    const [file, setFile] = useState(null)
    const [fileContent, setFileContent] = useState(null)
    const [Directory, setDirectory] = useState(null)
    const [files, setFiles] = useState([])
    const [targetFile, setTargetFile] = useState([]);
    const [targetFileContent, setTargetFileContent] = useState('')

    // fileHandle is an instance of FileSystemFileHandle..
    async function writeFile(targetFileHandle, contents) {
      // Create a FileSystemWritableFileStream to write to.
      const writable = await targetFileHandle.createWritable();
      // Write the contents of the file to the stream.
      await writable.write(contents);
      // Close the file and write the contents to disk.
      await writable.close();
    }
    return (
      <div>
        <div>
          <button onClick={async ()=>{
            let [fileHandle] = await window.showOpenFilePicker();
            const file = await fileHandle.getFile();
            console.log('file->>',file)
            const contents = await file.text();
            console.log('contents->>',contents)
            setFileHandle(fileHandle)
            setFile(file)
            setFileContent(contents)
          }}>
            Открытие файла
          </button>
          <button onClick={async ()=>{
            const options = {
              types: [
                {
                  description: 'Text Files',
                  accept: {
                    'text/plain': ['.txt'],
                  },
                },
              ],
            };
            const handle = await window.showSaveFilePicker(options);
            setFileHandle(handle);          
          }}>
            Создать файл
          </button>
          <button onClick={()=>{
              console.log(fileHandle);
              writeFile(fileHandle,'asd')
              // const writable = await fileHandle.createWritable();
              // // // Write the contents of the file to the stream.
              // await writable.write('123123ASDFASDFXZCVZXCVASDFAGDFGHRTEYERTWQWERSDGSDFGSD');
              // // // Close the file and write the contents to disk.
              // await writable.close();         
            }}>
            Записать в файл
          </button>
          <br/>
          {
            JSON.stringify(file)
          }
          <br/>
          {
            fileContent
          }
          <br/>
          <button
            onClick={async ()=>{              
              const directoryHandle = await window.showDirectoryPicker();
              console.log(directoryHandle)
              setDirectory(directoryHandle)
              console.log("Файлы в папке↓↓↓↓");
              for await (const entry of directoryHandle.values()) {
                // const file = await entry.getFile();
                // const contents = await file.text();
                console.log(entry.kind, entry.name);
              }
              console.log("Файлы в папке↑↑↑↑");
              const promises = [];
              let vFiles = [];
              for await (const entry of directoryHandle.values()) {
                if (entry.kind !== 'file') {
                  continue;
                }
                // promises.push(entry.getFile().then((file) => `${file.name} (${file.size})`));
                vFiles.push(entry);
                promises.push(entry.getFile().then((file) => file));
              }
              setFiles(vFiles)
              console.log('vFiles->>',vFiles)
              console.log(await Promise.all(promises));
            }}
          >
            Выберите папку
          </button>
          {files.map(
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
          }
          <br/>
          Выбранный файл: {targetFile.name}
          <textarea 
            id='fileContent'
            value={targetFileContent??''}
            onChange={(event=>{
              setTargetFileContent(event.target.value)
            })}
          />
        </div>
      </div>
    )
  };

export default Page_test_File;
