import {ipcRenderer} from 'electron';
require('application.css')

ipcRenderer.on('mainchannel', (_,data)=>{
    console.log(data.message)
  }
)

const loadAndDisplayData = ()=>{ 
    loadData().then(data=>{ 
        console.log(data)
        document.getElementById('message').innerHTML=data.number;
    }).catch(error=>
        console.error(error)
    )
}

const loadData = ()=>{
    return new Promise(resolve=>{
        ipcRenderer.send('loaddata')
        ipcRenderer.once('data',(_, data)=>resolve(data))
    })    
}

window.onload =()=>{
    const action = document.getElementById('action')
    action.addEventListener('click',loadAndDisplayData)
}