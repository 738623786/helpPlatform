/**
 * Created by csip on 17/5/8.
 */


//定义全部接口
var methodType = {};
var stringTools = require('./StringTools');

methodType.handleData =function(action,data,socketIO){
    if(methodType.socketIO != socketIO)
        methodType.socketIO = socketIO;

    var obj = stringTools.parseCallBackData(data);

    if (typeof eval('methodType.' + action) == 'function') {
        //方法存在,就去执行响应的方法
        eval('methodType.' + action + '(obj);');
    }
};

//用户登录接口
methodType.login = function(obj) {

   //获得js对象数据
    if (obj.state == 3) {
        methodType.socketIO.to(obj.oldSocket).emit('user outline', obj.oldSocket);
    }

};
//用户请求帮助接口
methodType.request = function(obj) {

    if(obj.success == 1 && obj.state == 1){
        //获取接收人数组
        var receives = obj.send;
        if(typeof receives == 'object' && typeof receives.length == 'number'){
            //接收人数组存在
            receives.forEach(function(item){
                //接收人收到的数据
                console.log(11111);
                var receiveData = [obj.requestInfo,obj.request_User];
                console.log(receiveData);
                methodType.socketIO.to(item.socket).emit('request help', receiveData);
            });
        }

    }
};

//用户去帮助接口
methodType.receive = function(obj) {

    if(obj.success == 1 && obj.state == 1){
        //其他接收人
        var otherUsers = obj.data;
        //请求用户
        var requestUser = obj.request_User;
        //请求信息的ID
        var requestID = obj.request_Id;


        //通知其他接收人,该消息已经被抢单
        otherUsers.forEach(function(item){
            //接收人收到的数据
            console.log(requestID);
            methodType.socketIO.to(item.socket).emit('received help begin', requestID);
        });
        //通知发送请求的用户,该消息已经被抢单
        methodType.socketIO.to(requestUser.socket).emit('sended help begin', requestID);

    }
};


//发送帮助用户强行取消
methodType.reqForceCancel = function(obj) {

    if(obj.success == 1 && obj.state == 1){
        var helpUser = obj.res_User;
        var requestID = obj.request_Id;
        methodType.socketIO.to(helpUser.socket).emit('request force cancel', requestID);
    }
};

//接收帮助用户强行取消
methodType.resForceCancel = function(obj) {

    if(obj.success == 1 && obj.state == 1){

        var requestUser = obj.req_User;
        var requestID = obj.request_Id;
        methodType.socketIO.to(requestUser.socket).emit('help force cancel', requestID);

    }
};






module.exports = methodType;