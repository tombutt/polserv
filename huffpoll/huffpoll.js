var http = require('http');
var cache = require('node-memory-cache');
var cacheDuration = 5*(1000*60);
exports.makeHuffPollRequest = function (path, callback){
    if (path == '/huffpoll/charts'){
            var str = '';            
            str = cache.get('huffpoll', 'charts');
            if (str != null){
                console.log('got cache');
                callback(str);
            } else {
                str = '';
                http.get('http://elections.huffingtonpost.com/pollster/api/charts', function(res){
                res.on('data', function(chunk){
                    str += chunk;
                });
                res.on('end', function() {
                    cache.set('huffpoll', 'charts', str, cacheDuration);
//                    var jsonObj = JSON.parse(str);
                    callback(str); 
                });
            });
            }
    } else if (path == '/huffpoll/polls'){
        var str = '';
        str = cache.get('huffpoll', 'polls');
        if (str != null){
            console.log('got cache');
            callback(str)
        } else {
            str = '';
            http.get('http://elections.huffingtonpost.com/pollster/api/polls', function(res){
            res.on('data', function(chunk){
                str += chunk;
            });
            res.on('end', function() {
                cache.set('huffpoll', 'polls', str, cacheDuration);
      //          var jsonObj = JSON.parse(str);
                callback(str); 
                });
            });     
        }
    }
};