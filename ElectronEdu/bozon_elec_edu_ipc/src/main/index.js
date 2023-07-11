import {app, BrowserWindow} from 'electron'

const createWindow = ()=> {
  let window = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {      
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  window.webContents.openDevTools()

  window.webContents.loadFile('renderer/index.html')

  window.webContents.on('did-finish-load', ()=>{
    window.webContents.send('mainchannel', {message: 'App is running'})
  })
  
  window.on('ready-to-show', ()=>{
    window.show()
  })
  
}

app.on('ready', ()=>{
  createWindow()
})