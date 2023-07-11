import {ipcRenderer} from 'electron';
require('application.css')

ipcRenderer.on('mainchannel', (_,data)=>{
   alert(data.message)
  }
)