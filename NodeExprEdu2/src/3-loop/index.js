const http = require('http');

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


function calcFunc(response){
  let counter = 1;
  for(let i = 1; i < 100000; i++){
    setTimeout(()=>{
      counter=counter+Math.floor(Math.random()*10000)
      console.log(counter)
    }, 100)    
  }
  console.log(`${response.url}.end`)
  response.end(`counter = ${counter}`);
}


server.listen(3000);
