var https = require('https');
var cache = require('node-memory-cache');
var cacheDuration = 5*(1000*60);
exports.makeGovTrackRequest = function (path, callback){
    if (path == '/govtrack/bills'){
            var str = '';            
            str = cache.get('govtrack', 'bills');
            if (str != null){
                console.log('got cache');
                callback(str);
            } else {
                str = '';
                https.get('https://www.govtrack.us/api/v2/bill?congress=114&order_by=-current_status_date', function(res){
                res.on('data', function(chunk){
                    str += chunk;
                });
                res.on('end', function() {
                    cache.set('govtrack', 'bills', str, cacheDuration);
//                    var jsonObj = JSON.parse(str);
                    callback(str); 
                });
            });
            }
    } else if (path == '/govtrack/congress'){
        var str = '';
        str = cache.get('govtrack', 'congress');
        if (str != null){
            console.log('got cache');
            callback(str)
        } else {
            str = '';
            https.get('https://www.govtrack.us/api/v2/role?current=true', function(res){
            res.on('data', function(chunk){
                str += chunk;
            });
            res.on('end', function() {
                cache.set('govtrack', 'congress', str, cacheDuration);
      //          var jsonObj = JSON.parse(str);
                callback(str); 
                });
            });     
        }
    }
};