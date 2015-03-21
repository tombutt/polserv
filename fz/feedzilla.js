var http = require('http');

exports.makeFeedzillaRequest = function (path, callback){
            http.get('http://api.feedzilla.com/v1/subcategories.json', function(res){
            var str = '';
            res.on('data', function(chunk){
                str += chunk;
            });
            res.on('end', function() {
                var jsonObj = JSON.parse(str);
                console.log(jsonObj[0].category_id);
               callback(str); 
            });
        });
};