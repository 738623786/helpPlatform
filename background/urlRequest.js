/**
 * Created by csip on 17/5/8.
 * 请求后台接口
 */
//接口请求对象
var request = require('request');
//接口服务根地址
var baseUrl = 'http://www.huxinhuzhu.cn:8080/test/';
var stringTools = require('./StringTools');
var urlRequest = {};


urlRequest.get = function(action,params,success,failure) {

    //接口请求地址
    var urlStr = baseUrl+ action + '?'+ stringTools.appendUrl(params);
    request(urlStr, function (error, response) {

        if (!error && response.statusCode == 200) {//成功
             success(response.body);
        }else {//失败
            if(error){
                failure(error);
            } else {
                var status = {
                    code:response.statusCode,
                    message:response.statusMessage
                };
                failure(JSON.stringify(status));
            }
        }
    });

};



module.exports = urlRequest;
