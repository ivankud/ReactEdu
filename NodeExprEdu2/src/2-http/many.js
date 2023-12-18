const http = require('http');
const requests = [];

const server = http.createServer(function(request, response){
	requests.push(request);
	console.log(`request->${request.url}`)
	setTimeout(()=>{
		console.log(requests.length)
		response.end('hi');
	},3000)
})

server.listen(3000);
