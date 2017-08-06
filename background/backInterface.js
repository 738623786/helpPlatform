/**
 * Created by csip on 17/5/8.
 * 后台接口
 */
//引入方法类型对象
var methodType = require('./methodType');
//引入后台请求接口
var urlReq = require('./urlRequest');

var bInterface = {};

bInterface.server = function (app,socketIO) {
    app.all('*', function (req, res) {

        // 输出 JSON 格式
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});//设置response编码为utf-8

        //根据接口中的方法名来调用对应的方法
        var action = req._parsedUrl.pathname.slice(1);
        //变量名的正则表达式
        var reg = /^[a-zA-Z_$][a-zA-Z0-9_$]*/;
        //获取满足变量名的子串数组
        var matchArr = reg.exec(action);
        //方法名称是否合法
        if (!matchArr || matchArr[0].length != action.length) {
            res.end('方法名称:' + action + '不合法!');
            return;
        }

        var param;
        if (req.method == "POST") {
            param = req.body;
        } else {
            param = req.query || req.params;
        }


        urlReq.get(action,param, function (data) {

            res.end(data);
            methodType.handleData(action,data,socketIO);
        }, function (e) {
            res.end(JSON.stringify(e));
        });


    });
};




module.exports = bInterface;

