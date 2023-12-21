const http = require('http');
const wt = require('node:worker_threads'); 

console.log(wt)

let cachedResult = 0;

const server = http.createServer(function(request, response){
	console.log(`request->${request.url}`)
  switch (request.url) {
    case '/': 
		  response.end('home page');
      break;
    case '/calc': 
      calcFunc(response)
      break;
    default: 
      response.writeHead(404);
      response.end('page not faund');
      break;
  }	
})

function mainPage(request, response){
  response.end(`main, result = ${cachedResult}`)
}

function calcFunc(response){
  console.log('__dirname->>',__dirname)
  // console.log('__dirname.file->>',path.join(__dirname, 'calc.js'))
  let worker = new wt.Worker('./calc.js')
  //in real, error event
  worker.on('message', value => {
    response.end(`calculated, result = ${value}`)
  }) 
  
}

server.listen(3000);
