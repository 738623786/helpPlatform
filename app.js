/**
 * Created by fjl on 17/4/13.
 * 监听服务端口,绑定入口显示的网页
 */
var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var options = {
    pfx: require('fs').readFileSync(__dirname+'/huxinhuzhu.cn.pfx'),
    passphrase: '88750262010083f'
};
var httpsServer =require('https').createServer(options, app);

//建立socket.io的数据转站(后台程序)
var transpond = require("./background/transpond");
var io = transpond.ioServer(httpServer);
//var ios = transpond.ioServer(httpsServer);

//响应客户端的请求(访问该服务地址的客户端)
app.get('/',function (req,res) {
    //将特定网页发送(响应)给客户端
    res.sendFile(__dirname + '/foreground/index.html');
});
//公开特定目录(让客户端能够访问该目录下的资源)
app.use(express.static(__dirname + '/foreground'));


//建立后台接口服务
var backInterface = require("./background/backInterface");
backInterface.server(app,io);
//backInterface.server(app,ios);

//监听端口(网页程序端口号)
var httpPort =  80;
var httpsPort = 8000;
httpServer.listen(httpPort, function() {
    console.log('http listening:'+httpPort);
});
httpsServer.listen(httpsPort, function() {
    console.log('https listening:'+httpsPort);
});





