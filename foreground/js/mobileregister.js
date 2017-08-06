/**
 * Created by fjl on 17/4/17.
 */

$(function () {

    var zt = true;
    $('#phone_zhuce').submit(function () {

        console.log(window.parent.window.socket.id);

        var method = 'sendSecurityCode';

        var params = {
            tel: $("#tel_zhuce").val(),
        }
        window.parent.window.requestURL("sendSecurityCode", params, function (data) {
            if (data.success == 1) {


                window.parent.window.tel = $("#tel_zhuce").val();

                window.parent.window.myIframe.setAttribute("src", "html/userpassword.html")
            } else {
                alert(data.message[data.state])
            }
        })


        return false;
    });


});

//手机注册时的判断
window.onload = function () {
    var a = document.getElementById("btn_shouji");
    a.onclick = function () {
        if ($("#tel_zhuce").val().length == 0) {
            alert("您的手机号未输入！");
            return false;
        }//else if(($("#tel_zhuce").val().length>0)&&(){

        //}
        if ($("#security_code").val().length == 0) {
            alert("您的验证码未输入！");
            return false;
        }
        //window.parent.window.myIframe.setAttribute("src","html/userpassword.html")
    }
    var back = document.getElementsByClassName("icon-jiantou2")[0];
    back.onclick = function () {
        window.history.go(-1);
        return false;
    }
    
    $("#get_code").click(function(){
    	
    	return false;
    })
}
