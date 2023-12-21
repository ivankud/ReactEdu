const wt = require('node:worker_threads'); 

 let counter = 0;
 for(let i = 1; i < 10000; i++){
     counter+=Math.floor(Math.random()*10000)
     for(let j = 1; j < 10000; j++){
       counter+=Math.floor(Math.random()*10000)
     }    
 }


cachedResult = counter;

wt.parentPort.postMessage(cachedResult) 