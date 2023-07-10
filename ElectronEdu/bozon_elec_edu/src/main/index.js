
const {app, screen, Menu, MenuItem, BrowserWindow, Tray} = require('electron')
import path from 'path';
import icon from 'trayTemplate.png'

const lock = app.releaseSingleInstanceLock();

const menuTemplate = [{
  label: 'MyCustomMenuItem',
  submenu :[
    new MenuItem({
      label: 'Option 1',
      click() {
        console.log('Option 1 clicked')
      }
    }),
    new MenuItem({
      type: 'separator'
    }),
    new MenuItem({
      label: 'Option 2',
      click() {
        console.log('Option 2 clicked')
      }
    })
  ]
},
{
  label:'MyApp',
  submenu: [
    {role:"about"},
    {type:"separator"},
    {role:"services"},
    {type:"separator"},
    {role:"hide"},
    {role:"hideothers"},
    {type:"separator"},
    {role:"unhide"},
    {role:"hide"},
    {role:"quit"},
  ]
}
]


 const ctxMenuTemplate = [
    {label:"Option 1"},
    {label:"Option 2"},
    {type:"separator"},
    {label:"Option 3"},
]

const ctxMenu = new Menu.buildFromTemplate(ctxMenuTemplate)

const createMenu =()=>{
  const menu = new Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu);
}

const createWindow = ()=>{
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;
  let window = new BrowserWindow({
    show:false,
    width : 900,
    height : 900,
    minHeight: 400,
    minWidth: 400,
    maxHeight: height,
    // frame : false,
    maxWidth: width,
    /*webPreferences is not save. Use preload script instead*/
    webPreferences: true,
    backgroundColor: '#fff200'
  })
  window.on('ready-to-show', ()=>{
    window.show();
  })
  // window.loadURL('https://google.com')
  window.loadFile('renderer/index.html');
  // window.webContents.openDevTools()

  window.webContents.on('context-menu', (event, params)=>{
    ctxMenu.popup(window, params.x,params.y)
  })
  
  const tray = new Tray(path.resolve(__dirname,icon))
  tray.setToolTip('Electron Application')
  
  tray.on('click', ()=>{
    window.isVisible() ? window.hide(): window.show()
  })
}


if(!lock) {
  app.quit;
} else {
  app.on('second-instance', ()=>{
    console.log('App is already running')
    if(win){
      win.focus();
    }
  })
}


app.whenReady().then(()=>{
  createMenu()
  createWindow()
})
