/**
 * Created by fjl on 17/4/15.
 */
//定义全局对象
!function () {
    window.socket = io();
    window.userInfo = localStorage.getItem('userinfo');
    window.token = localStorage.getItem('token');
    window.baseURL = 'http://www.huxinhuzhu.cn/';//'http://127.0.0.1/';
    window.myIframe = document.getElementById('mainFrame');
    window.myzhuye = document.getElementById('zhuye_iframe');
    window.geolocation = new BMap.Geolocation();
   
}();
//注册页面的全局对象
!function () {
    window.tel = "";
    window.password = "";
    window.real_Name = "";
    window.identity_Card = "";
    window.name = "";
    window.sex = "";
}();

//地图信息的全局对象
!function () {
    window.loc = null;
    window.address = '';
}();


//调用接口方法
window.requestURL = function (method, params, success) {

    var urlStr = window.baseURL + method + '?' + appendUrl(params);
     console.log("--------请求"+method+"接口--------\n"+urlStr);
    $.ajax({
        url: urlStr,
        // url: 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18848962883',
        type: 'GET',
        dataType: 'jsonp',

        success: function (data, textStatus) {
            console.log("--------"+method+"接口返回的数据--------\n");
            console.log(data);
            //console.log(JSON.stringify(data));

            success(data);

        },

        error: function (error) {
            console.log("--------请求接口错误信息--------\n"+JSON.stringify(error));
        }


    })
};


//调用接口方法(超时会失败)
window.requestURL_LT = function (method, params, timeOut, success, failure) {
    var urlStr = window.baseURL + method + '?' + appendUrl(params);
    $.ajax({
        url: urlStr,
        // url: 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18848962883',
        type: 'GET',
        dataType: 'jsonp',
        timeout: timeOut,
        beforeSend: function (XMLHttpRequest) {
            console.log('begin');
        },
        success: function (data, textStatus) {
            console.log(data);

            success(data);

        },
        complete: function (XMLHttpRequest, textStatus) {
            console.log('coplete');
        },
        error: function (error) {
            console.log(error);
            if (failure) {
                failure();
            }
        }


    })
};

//将参数转化为url路径
function appendUrl(params) {
    var url = '';
    for (o in params) {
        str = o + "=" + params[o];
        if (url === '')
            url += str;
        else
            url += ("&" + str);
    }
    return url;
}

//localStorage.clear()

//返回上个界面
window.gobackHTML=function(){
		window.history.go(-1);
}
