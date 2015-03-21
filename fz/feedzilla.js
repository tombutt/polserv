var http = require('http');
var cache = require('node-memory-cache');
var cacheDuration = 5*(1000*60);
exports.makeFeedzillaRequest = function (path, callback){
    if (path == '/feedzilla/categories'){
            var str = '';            
            str = cache.get('feedzilla', 'categories');
            if (str != null){
                console.log('got cache');
                callback(str);
            } else {
                str = '';
                http.get('http://api.feedzilla.com/v1/categories.json', function(res){
                res.on('data', function(chunk){
                    str += chunk;
                });
                res.on('end', function() {
                    cache.set('feedzilla', 'categories', str, cacheDuration);
//                    var jsonObj = JSON.parse(str);
                    callback(str); 
                });
            });
            }
    } else if (path == '/feedzilla/subcategories'){
        var str = '';
        str = cache.get('feedzilla', 'subcategories');
        if (str != null){
            console.log('got cache');
            callback(str)
        } else {
            str = '';
            http.get('http://api.feedzilla.com/v1/subcategories.json', function(res){
            res.on('data', function(chunk){
                str += chunk;
            });
            res.on('end', function() {
                cache.set('feedzilla', 'subcategories', str, cacheDuration);
      //          var jsonObj = JSON.parse(str);
                callback(str); 
                });
            });     
        }
    }
};