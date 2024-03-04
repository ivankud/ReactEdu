import React , { useEffect, useState } from "react";


const FolderIcon = (elem, horizontalSize, kind, selectFolder) => {
  let label = elem?.name??"Без названия";
  return (
      <button 
        style={{width:`${100/horizontalSize}%`}}
        onClick={()=>{
          console.log(elem.kind)
        }}
      >         
        <div onClick={()=>{selectFolder(elem)}}>
          <svg xmlns="http://www.w3.org/2000/svg" 
              width="64"
              height="64"
              viewBox="0 0 512 512"
            >
            {kind==='directory'&&<path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"/>}
            {kind==='file'&&<path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/>}
          </svg>
        </div>
        
        {label}    
      </button> 
  )
}

function GetListFolderAndFiles(size, folders, files, selectFolder, directories){
  // console.log('folders->>',folders)
  // console.log('files->>',files)
  let List = []
  let counterLine = 0; // счетчик строк
  let ListFolderAndLists = [].concat(folders,files)
  let lenList = ListFolderAndLists.length;
  let horizontalSize = size['horizontalSize'];
  // console.log('lenList->',lenList)
  if(lenList===0) return null;
  
  while (lenList>(counterLine*horizontalSize)) {
    let vListTMP = []
    let vSliceList = ListFolderAndLists.slice(counterLine*horizontalSize,counterLine*horizontalSize+horizontalSize)
    vSliceList.forEach(listElem=>{
      vListTMP.push(FolderIcon(listElem,horizontalSize, listElem.kind, selectFolder))
    })  
    // <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 9L14.5 9C16.9853 9 19 11.0147 19 13.5C19 15.9853 16.9853 18 14.5 18H5" stroke="#121923" stroke-width="1.2"></path> <path d="M9 13L5 9L9 5" stroke="#121923" stroke-width="1.2"></path> </g></svg>
    let vLine = <div 
                  style={{display:"inline-block",  width:'100%'}} 
                >
                  {vListTMP.map((elem)=>elem)}
                </div>
    List.push(vLine)  
    counterLine++;
  }
  

  return List.map(elem=>elem);
}


const FolderListWrapper = (props) => {
  const [size, setSize] = useState(props['size']??{"vertiacalSize":4, "horizontalSize":4})
  const [folderHandler, setFolderHandler] = useState(props['folderHandler']??null)
  const [filesHandler, setFilsHandler] = useState(props['nestedFilesHandlers']??null)
  const [foldersHandler, setFoldersHandler] = useState(props['nestedFoldersHandlers']??null)
  useEffect(()=>{
    setSize(props['size']??{"vertiacalSize":4, "horizontalSize":4})
    setFolderHandler(props['folderHandler']??null)
    setFilsHandler(props['nestedFilesHandlers']??null)
    setFoldersHandler(props['nestedFoldersHandlers']??null)
    console.log('useEffect->>',props)
  }, [props])
  return (
    <div className="flex-1 p-1" style ={{borderColor:"#f0ffff",backgroundColor:"#f0ffff", borderStyle:"groove", width:'100%', height: "100%"}}>
      {GetListFolderAndFiles(size, foldersHandler, filesHandler, props.selectFolder, props.directories)}
    </div>
  )
}


export default FolderListWrapper