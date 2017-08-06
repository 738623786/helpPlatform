
//设置socket对象的属性观察方法
window.socket.watch = function (pro, callback) {


    var old = this[pro];
    Object.defineProperty(this, pro, {
        set: function (val) {
            var o = old;
            old = val;
            callback(val, o, this);
        },
        get: function () {
            return old;
        }
    });

};

//清除缓存
(function(){
    //清空请求列表数据
    localStorage.setItem('h_receives','');
    localStorage.setItem('h_requests','');
    //清空帮助列表数据
    localStorage.setItem('r_receives','');
    localStorage.setItem('r_requests','');

})();


(function () {
    var localToken = localStorage.getItem('token');
    if (localToken && localToken.length > 0) { //本地缓存的token存在且不为空

        //观察socket的id属性
        window.socket.watch('id', function (n) {
            token_login(localToken, n);
        });

    } else {
        window.myIframe.src = "html/login.html";
    }

})();

//使用token登录
function token_login(token, soketID) {
    var params = {
        token: token,
        socket: soketID,
    }
    console.log(params);
    window.requestURL('token_Login', params,
        function (data) {
            if (data.success == 1) {
                //保存用户信息
                window.parent.window.userInfo = data.data;
                //跳转到注册的页面
                window.myIframe.src = "html/zhuye.html"
            } else {
                localStorage.setItem("token", '');
                window.token = '';
                myIframe.src = "html/login.html";
            }
        }
    )
}


