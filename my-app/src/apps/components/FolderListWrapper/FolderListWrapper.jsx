import React , { useEffect, useState } from "react";


const FolderIcon = (label) => {
  console.log(label)
  return (
    <div>
      <button>
        <div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="64"
                height="64"
                viewBox="0 0 512 512">
              <path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"/>
            </svg>
          </div>
          <div>{label}</div>
        </div>
      </button>
      
    </div>
  )
}
{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/></svg> */}

function GetListFolderAndFiles(size, folders, files){
  console.log('folders->>',folders)
  console.log('files->>',files)
  let List = []
  let counter = 0;
  let ListFolderAndLists = [].concat(files, folders)
  console.log('ListFolderAndLists123->>',ListFolderAndLists)
  for (let indexX = 0; indexX < size.horizontalSize; indexX++) {
    let vListTMP = []    
    for (let indexY = 0; indexY < size.vertiacalSize; indexY++) {
      console.log(ListFolderAndLists[counter])
      vListTMP.push(FolderIcon(`${indexX}_${indexY}`))
      counter++;
    } 
    let vLine = <div style={{display: "inline-block"}}>      
                  {vListTMP.map((elem)=>elem)}
                </div>
    List.push(vLine)
  } 
  return List.map(elem=>elem);
}


const FolderListWrapper = (props) => {
  const [size, setSize] = useState(props['size']??{"vertiacalSize":4, "horizontalSize":4})
  const [folderHandler, setFolderHandler] = useState(props['folderHandler']??null)
  const [filesHandler, setFilsHandler] = useState(props['nestedFilesHandlers']??null)
  const [foldersHandler, setFoldersHandler] = useState(props['nestedFoldersHandlers']??null)
  // folderHandler={Directory} nestedFoldersHandlers={folders} nestedFilesHandlers={files}/>
  // console.log(props.size)
  // console.log("folderHandler->>", props.folderHandler)
  useEffect(()=>{
    setSize(props['size']??{"vertiacalSize":4, "horizontalSize":4})
    setFolderHandler(props['folderHandler']??null)
    setFilsHandler(props['nestedFilesHandlers']??null)
    setFoldersHandler(props['nestedFoldersHandlers']??null)
    console.log('useEffect->>',props)
  }, [props])
  return (
    <div className="flex-1 p-1" style ={{borderColor:"#f0ffff", borderStyle:"groove"}}>
        {GetListFolderAndFiles(size, foldersHandler, filesHandler)}
    </div>
  )
}


export default FolderListWrapper