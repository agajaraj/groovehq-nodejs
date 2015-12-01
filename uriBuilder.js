var e = module.exports;
var Promise = require('promise');

e.buildUri = function (object, params) {
    return new Promise(function (fulfill, reject){
        if (!object) reject("Invalid Parameters");
        var post = "?";
        if (params) {
            var keys = Object.keys(params);
            for (var index = 0; index < keys.length; index++) {
                var key = keys[index];
                post += key + "=" + params[key];
                if (index != keys.length - 1) {
                    post += "&";
                }
            }
        }
        fulfill("https://api.groovehq.com/v1/" + object + (params ? post : ""));
    });
}

