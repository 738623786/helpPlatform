/**
 *
 *
 */

var r_receives = null;
var r_requests = null;

//设置socket对象的属性观察方法
window.parent.parent.window.watch = function (pro, callback) {


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


!function () {


    var super_window = window.parent.parent.parent.window;

    var locStorage = localStorage;

    //数据不存在,从缓冲中获取数据
    var dataStr = localStorage.getItem('r_receives');
    if (dataStr && dataStr.length > 0) {
        r_receives = JSON.parse(dataStr);
    }
    dataStr = localStorage.getItem('r_requests');
    if (dataStr && dataStr.length > 0) {
        r_requests = JSON.parse(dataStr);
    }

    //保证数组的存在
    r_receives = r_receives || [];
    r_requests = r_requests || [];
    //连接两个数组
    var data = r_receives.concat(r_requests);

    if (data.length>0) {
        //刷新帮助他人页面
        refresh_requestHelp(data);
    } else {
        request_refReq(super_window, locStorage);
    }

}();


//请求ref_Req接口
function request_refReq(super_window, localStorage) {
    var params = {
        token: super_window.token
    };
    super_window.requestURL('ref_Req', params, function (data) {
        if (data.success == 1) {

            r_receives = data.received;
            r_requests = data.requests;

            //保证数组的存在
            r_receives = r_receives || [];
            r_requests = r_requests || [];

            //颠倒数组顺序
            r_receives.reverse();
            r_requests.reverse();

            var data = r_receives.concat(r_requests);
            refresh_requestHelp(data);

            localStorage.setItem('r_receives', JSON.stringify(r_receives));
            localStorage.setItem('r_requests', JSON.stringify(r_requests));
        } else {
            alert(data.message[data.state]);
        }
    });
}

//刷新帮助他人页面
function refresh_requestHelp(requests) {
    var data = {list: requests};

    var tpl = document.getElementById('help_list').innerHTML;
    var html = juicer(tpl, data);
    var helps = document.getElementById('helps');
    helps.innerHTML = html;
}


//请求帮助跳转到newhelp界面
window.onload = function () {
    var icon = document.getElementsByClassName("div_out");
    icon[0].onclick = function () {
        var s = document.getElementById("zhuye_iframe");
        //window.parent.location.href="newhelp.html";
        window.parent.parent.window.myIframe.setAttribute("src", "html/newhelp.html");
    }
}


//点击强行取消时的事件

var quxiao = document.getElementsByClassName("pl_quxiao");
for (o in quxiao) {
    o.onclick = function () {
        console.log(o);
        var params = {
            token: 1,
            request_Id: 2,
        }
        window.parent.parent.requestURL("re_Cancel", params, function (data) {
            if (data.success == 1) {
                alert(data.message[data.state]);
            } else {
                alert(data.message[data.state]);
            }
        })

    }
}







