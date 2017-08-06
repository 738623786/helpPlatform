window.onload = function () {

    var btn_perfecta = document.getElementById("btn_perfecta");
    btn_perfecta.onclick = function () {
        if ($("#not_name").val().length == 0) {
            alert("请输入您的昵称！ ");
            return false;
        }
        window.parent.window.name = $("#not_name").val();
        window.parent.window.sex = $('#sex input[name="sex"]:checked').val();

    }
    //返回上一页
    var back = document.getElementsByClassName("icon-jiantou2")[0];
    back.onclick = function () {
        window.history.go(-1);
        return false;
    }
}
//跳过的点击事件
$("#btn_perfect").click(function(){
	
	
	var method = 'register';

    var params = {
        tel: window.parent.window.tel,
        password: window.parent.window.password,
        real_Name: window.parent.window.real_Name,
        identity_Card: window.parent.window.identity_Card,
      
        token: window.parent.window.token,
    }
    window.parent.window.requestURL("register", params, function (data) {
        if (data.success == 1) {
            window.parent.window.myIframe.setAttribute("src", "html/login.html");
        } else {
            alert(data.message[data.state]);
        }
    })


})
//点击下一步请求接口
$("#btn_perfecta").click(function () {
    var method = 'register';

    var params = {
        tel: window.parent.window.tel,
        password: window.parent.window.password,
        real_Name: window.parent.window.real_Name,
        identity_Card: window.parent.window.identity_Card,
        name: $("#not_name").val(),
        sex: $("#sex input[name='sex']:checked").val(),
        token: window.parent.window.token,
    }
    window.parent.window.requestURL("register", params, function (data) {
        if (data.success == 1) {
            window.parent.window.myIframe.setAttribute("src", "html/login.html");
        } else {
            alert(data.message[data.state]);
        }
    })

})

