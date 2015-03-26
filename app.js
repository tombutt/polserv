var http = require('http');
var url = require('url');
var feedzilla = require("./fz/feedzilla.js");
var huffpoll = require("./huffpoll/huffpoll.js");
var hacknews = require("./hackernews/hackernews.js");
var govtrack = require("./govtrack/govtrack.js")

function onRequest(request, response) {
    console.log('started');
    var pathname = url.parse(request.url).pathname;
    //if (pathname == '/feedzilla'){
    if (pathname.indexOf('feedzilla') > -1){
        console.log('about to callback');
        feedzilla.makeFeedzillaRequest(pathname, myCallback);        
    } else if (pathname.indexOf('huffpoll') > -1){
        huffpoll.makeHuffPollRequest(pathname, myCallback);
    } else if (pathname.indexOf('hackernews') > -1){
        hacknews.makeHackerNewsRequest(pathname, myCallback);
    } else if (pathname.indexOf('govtrack')> -1){
        govtrack.makeGovTrackRequest(pathname, myCallback);
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

http.createServer(onRequest).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');