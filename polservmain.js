var http = require('http');
var url = require('url');
var feedzilla = require("./fz/feedzilla.js");


function onRequest(request, response) {
    console.log('started');
    var pathname = url.parse(request.url).pathname;
    if (pathname == '/feedzilla'){
        console.log('about to callback');
        feedzilla.makeFeedzillaRequest(pathname, myCallback);        
    } else {
        console.log('not calling back');
        console.log(request.url);
        console.log(request.headers);
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end('Heya!');        
    }
    
    function myCallback(body){
        console.log('calling back');
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end(body);
    }
}

http.createServer(onRequest).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');