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
  let i = 1
  counter = iCalc(i)
  response.end(`counter = ${counter}`);
  console.log(`123->${i}`)
}

function iCalc(i){

  let counter = 0;
  if(i < 1000){
    counter=counter+Math.floor(Math.random()*10000)
    console.log(i)
    i++;
    counter+=jCalc(i)
    setTimeout(()=>iCalc(i),0)
    set
  }
  return counter; 
}

function jCalc(i){
  let counter = 0;
  for(let j = 1; j < 1000; j++){
      counter=counter+Math.floor(Math.random()*10000)
  }
  return counter; 
}


server.listen(3000);
