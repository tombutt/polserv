var http = require('http');
var cache = require('node-memory-cache');
var cacheDuration = 5*(1000*60);
exports.makeHackerNewsRequest = function (path, callback){
    if (path == '/hackernews/newcomments'){
            var str = '';            
            str = cache.get('hackernews', 'newcomments');
            if (str != null){
                console.log('got cache');
                callback(str);
            } else {
                str = '';
                http.get('http://api.ihackernews.com/newcomments', function(res){
                res.on('data', function(chunk){
                    str += chunk;
                });
                res.on('end', function() {
                    cache.set('hackernews', 'newcomments', str, cacheDuration);
//                    var jsonObj = JSON.parse(str);
                    callback(str); 
                });
            });
            }
    } else if (path == '/hackernews/ask'){
        var str = '';
        str = cache.get('hackernews', 'ask');
        if (str != null){
            console.log('got cache');
            callback(str)
        } else {
            str = '';
            http.get('http://api.ihackernews.com/ask', function(res){
            res.on('data', function(chunk){
                str += chunk;
            });
            res.on('end', function() {
                cache.set('hackernews', 'ask', str, cacheDuration);
      //          var jsonObj = JSON.parse(str);
                callback(str); 
                });
            });     
        }
    }
};