//及时帮助

var h_receives = null;
var h_requests = null;

//设置socket对象的属性观察方法
window.parent.parent.parent.window.watch = function (pro, callback) {


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

!function(){


	var super_window = window.parent.parent.parent.window;

	var locStorage = localStorage;
	if(!h_receives){
		//数据不存在,从缓冲中获取数据
		var dataStr =  localStorage.getItem('h_receives');
		if (dataStr && dataStr.length>0){
			h_receives = JSON.parse(dataStr);
		}
	}

	if(!h_requests){
		//数据不存在,从缓冲中获取数据
		var dataStr =  localStorage.getItem('h_requests');
		if (dataStr && dataStr.length>0){
			h_requests = JSON.parse(dataStr);
		}
	}

	//保证数组的存在
	h_receives = h_receives || [];
	h_requests = h_requests || [];
	//连接两个数组
	var data = h_receives.concat(h_requests);

	if(data.length>0){
		//刷新帮助他人页面
		refresh_helpOther(data);
	}else {
		//缓存中的数据不存在,从服务器中回去数据
		if(super_window.loc){
			//请求ref_Help接口
			request_refHelp(super_window,locStorage);
		}else {
			super_window.watch('loc', function (n) {
				//请求ref_Help接口
				request_refHelp(super_window,locStorage);
			});
		}

	}

}();


//请求ref_Help接口
function request_refHelp(super_window,localStorage){
	var params = {
		token: super_window.token
	};
	super_window.requestURL('ref_Help', params, function(data) {
		if(data.success == 1) {
			h_receives = data.received;
			h_requests = data.requests;

			//保证数组的存在
			h_receives = h_receives || [];
			h_requests = h_requests || [];

			//颠倒数组顺序
			h_receives.reverse();
			h_requests.reverse();


			var data = h_receives.concat(h_requests);
			refresh_helpOther(data);

			localStorage.setItem('h_receives',JSON.stringify(h_receives));
			localStorage.setItem('h_requests',JSON.stringify(h_requests));
		} else {
			alert(data.message[data.state]);
		}
	});
}

//刷新帮助他人页面
function refresh_helpOther(helpOthers){
	var showData =  {list:helpOthers};
	var tpl = document.getElementById('receive_tpl').innerHTML;
	var html = juicer(tpl, showData);
	var receive = document.getElementById('receivhelp_list');
	receive.innerHTML = html;
	$(".gohelp").click(goHelp);
	$(".refuse").click(refuseHelp);
	$(".two").click(forceCancel);
}

//点击去帮助发生的

function goHelp() {
	var li = this.parentNode;
	while (li && li.nodeName != 'LI'){
		li = li.parentNode;
	}
	if(li){
		var index = $(li).index();
		var params = {
			token: window.parent.parent.parent.window.token,
			request_Id: h_receives.concat(h_requests)[index][0].request_Id
		};
		window.parent.parent.parent.window.requestURL('receive', params, function(data) {
			if(data.success == 1) {

				var requestHelp = h_requests.splice(index-h_receives.length,1)[0];
				requestHelp[0].request_State = 1;
				h_receives.unshift(requestHelp);

				var data = h_receives.concat(h_requests);
				//刷新页面显示
				refresh_helpOther(data);
				document.body.scrollTop;

				//保存更改后的数据
				localStorage.setItem('h_receives',JSON.stringify(h_receives));
				localStorage.setItem('h_requests',JSON.stringify(h_requests));

			/*	li.getElementsByClassName('refuse')[0].className += ' display_none';
				li.getElementsByClassName('gohelp')[0].className += ' display_none';
				li.getElementsByClassName('hidden_yon')[0].className += ' display_block';
				li.getElementsByClassName('hidden_Two')[0].className = ' display_block';
				li.getElementsByClassName('phone_hidden')[0].className = ' display_block';*/
				/*
				$("li .refuse").css("display","none");
				$("li .gohelp").css("display","none");
				$("li .hidden_yon").css("display","block");
				$("li .hidden_Two").css("display","block");
				 $(".phone_hidden").fadeIn("slow");
				*/

			} else {
				alert(data.message[data.state]);
			}
		});
	}





}

//点击拒绝
function refuseHelp() {
	var li = this.parentNode;
	while(li && li.nodeName != 'LI') {
		li = li.parentNode;
	}
	if(li) {
		var index = $(li).index();

		//var ul = li.parentNode;
		////console.log(ul);
		//$("ul li:eq(" + index + ")").remove();

		h_requests.splice(index-h_receives.length,1)[0];

		var data = h_receives.concat(h_requests);
		//刷新页面显示
		refresh_helpOther(data);
		document.body.scrollTop;

		//保存更改后的数据
		localStorage.setItem('h_receives',JSON.stringify(h_receives));
		localStorage.setItem('h_requests',JSON.stringify(h_requests));

	}

}

//点击强行取消发生的变化
function forceCancel(){
	var msg = confirm("强制取消将影响您的信誉度\n\n您确定要取消吗？");
	if(msg != true) {
		return;
	}

	var li = this.parentNode;
	while(li && li.nodeName != 'LI') {
		li = li.parentNode;
	}
	if(li) {
		var index = $(li).index();

		//var ul = li.parentNode;
		////console.log(ul);
		//$("ul li:eq(" + index + ")").remove();

		var requestID =  h_receives[index][0].request_Id;

		var super_window = window.parent.parent.parent.window;
		var params = {
			token: super_window.token,
			request_Id:requestID
		};
		super_window.requestURL('resForceCancel', params, function(data) {
			if(data.success == 1) {
				h_receives.splice(index,1);
				var data = h_receives.concat(h_requests);
				//刷新页面显示
				refresh_helpOther(data);
				//保存更改后的数据
				localStorage.setItem('h_receives',JSON.stringify(h_receives));
				localStorage.setItem('h_requests',JSON.stringify(h_requests));



			} else {
				alert(data.message[data.state]);
			}
		});

	}

}







