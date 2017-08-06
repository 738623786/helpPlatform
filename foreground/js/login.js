/**
 * Created by fjl on 17/4/17.
 */

!function(){

	var tel = localStorage.getItem('tel');
	var password = localStorage.getItem('password');
	$("#tel").val(tel);
	$("#password").val(password);
}();

$(function() {

	$("#form_login").submit(function() {
      console.log(window.parent.window.socket.id);
		var params = {
			tel: $("#tel").val(),
			password: $("#password").val(),
			socket: window.parent.window.socket.id,
		}

		//window.parent.window.userLogin(params);

		window.parent.window.requestURL('login', params, function(data) {
			if(data.success == 1) {


				//保存用户信息
				window.parent.window.userInfo = data.data;
				//保存tokenw
				window.parent.window.token = data.data.token;
				//跳转到主页
				window.parent.window.myIframe.setAttribute("src", "html/zhuye.html");

				//缓存用户登录的账号和密码
				localStorage.setItem("tel", params.tel);
				localStorage.setItem("password", params.password);
				//缓存token
				localStorage.setItem("token", window.parent.window.token);

			} else {
				alert(data.message[data.state]);
			}
		});

		return false;
	});

});

window.onload = function() {
	var s = document.getElementById('login_zhuce');
	s.onclick = function(e) {
		window.parent.window.myIframe.setAttribute("src", "html/mobileregister.html");

	}
	var a = document.getElementById("btn_login");
	a.onclick = function(e) {
		if($("#tel").val().length == 0) {
			alert("请输入账号！");
			return false;
		}
		if($("#password").val().length == 0) {
			alert("请输入密码！");
			return false;
		} 

	}
	return false;
}