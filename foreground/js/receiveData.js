/**
 * Created by fjl on 17/4/13.
 * 用户数据接收器
 */
$(function () {
    //接收到该用户在其他地方登陆
    window.socket.on('user outline', function (socketID) {
        console.log('提示我要下线了:' + socketID);
        if (window.otherSocketID == socketID) {
            return;
        }
        var outline = confirm('您的账号在其他地方登录！\n\n 现在是否重新登录？');
        if (outline == true) {
            localStorage.setItem('token', '');
            window.myIframe.src = "html/login.html";

        } else {
            localStorage.setItem('token', '');
            window.myIframe.src = "html/login.html";
        }
    });

    window.socket.on('request help', function (help) {
        console.log(help);
        var h_requests = localStorage.getItem("h_requests");
        h_requests = JSON.parse(h_requests);
        h_requests = h_requests || [];
        h_requests.unshift(help);
        console.log(h_requests);
        localStorage.setItem('h_requests', JSON.stringify(h_requests));

    });

    //收到到某个接收的请求帮助已经被"抢单"的通知
    window.socket.on('received help begin', function (requestID) {
        console.log(requestID);
        var h_requests = localStorage.getItem("h_requests");
        h_requests = JSON.parse(h_requests);
       for(var i=0;i<h_requests.length;i++){
           if(h_requests[i][0].request_Id == requestID){
               //删除某个元素
               h_requests.splice(i,1);
               break;
           }
       }
        console.log(h_requests);
        localStorage.setItem('h_requests', JSON.stringify(h_requests));

    });

    //收到到某个发送的请求帮助已经被"抢单"的通知
    window.socket.on('sended help begin', function (requestID) {
        console.log(requestID);


    });

    //请求方强制取消帮助
    window.socket.on('request force cancel', function (requestID) {
        console.log(requestID);
    });

    //帮助方强制取消帮助
    window.socket.on('help force cancel', function (requestID) {
        console.log(requestID);
    });


});