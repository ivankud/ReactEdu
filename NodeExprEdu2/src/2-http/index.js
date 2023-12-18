const http = require('http');

const server = http.createServer(function(request, response){
	response.end('hi');
})

server.listen(3000);
