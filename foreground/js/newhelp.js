/**
 * Created by fjl on 17/5/2.
 */

//"返回"按钮点击
var back = document.getElementById("btn_backa");
back.onclick = function() {
	window.history.go(-1);
	
}

//"搜索"按钮点击
var shou = document.getElementById("btn_sec");
shou.onclick = function() {
	window.parent.parent.window.myIframe.src = "html/baidumap.html"
}
//"提交"按钮点击
var btn_sub = document.getElementById("btn_sub");
btn_sub.onclick = function() {
		if($("#textarera11").val.length == 0) {
			return;
		}
		if(!window.parent.window.loc) {
			alert("位置获取中，请稍候...")
		} else {
			var textArea = document.getElementById("textarera11");
			console.log(window.parent.window.loc);
			var params = {
				token: window.parent.window.token,
				tel: $("#tel").val(),
				helpType: $("#helpType input[name='type']:checked").val(),
				text: textArea.value,
				pulse: 0,
				cash: 0,
				longitude: window.parent.window.loc.lng,
				latitude: window.parent.window.loc.lat,
				distance: 1000000000,
				credit: 0,
				evaluate: 0,
			};

			if($("#sec_qiehuan option:selected").val() == 1) {
				params.pulse = $("#pulse_sec option:selected").val();
			} else {
				params.cash = $("#rmb_sec option:selected").val();
			}
			console.log(params);
			//		var rrr = JSON.parse(localStorage.getItem('requests'));
			//		if(Object.prototype.toString.call(rrr) == "[object Array]") {
			//			rrr.forEach(function(item) {
			//				if(item == data) {
			//					alert("两次发送内容不能一致！");
			//					return false;
			//				} else {
			//					
			//					
			//
			//				}
			//			})
			//		}

			//向后台发送寻求帮助请求
			window.parent.window.requestURL('request', params, function(data) {
				if(data.success == 1 && data.state == 1) {

					//localStorage.clear();
					var resquests = localStorage.getItem('requestDatas');
					resquests = JSON.parse(resquests);
					resquests = resquests || [];
					console.log(Object.prototype.toString.call(resquests));
					if(Object.prototype.toString.call(resquests) == "[object Array]") {
						resquests.every(function(item) {
							if(item.request_User == data.request_User) {
								console.log(item);
								console.log(data);
								console.log(Boolean(data==item))
								alert("两次请求不能完全一致！");
							return false;
							}
						})
					}
					resquests.unshift(data.requestInfo);
					console.log(resquests);
					localStorage.setItem('requestDatas', JSON.stringify(resquests));

					alert(data.message[data.state]);
					window.parent.parent.myIframe.src="html/zhuye.html"

				} else {
					alert(data.message[data.state]);
				}

			})
}
	}
			//网页初始化
			window.onload = function() {

				var select_tel = document.getElementById("tel");
				var option1 = document.createElement('option');
				option1.value = window.parent.window.userInfo.tel;
				option1.innerText = option1.value + '(注册手机号)';
				select_tel.appendChild(option1);
				if(window.parent.window.userInfo.stabdby_Tel) {
					var option2 = document.createElement('option');
					option2.value = window.parent.window.userInfo.tel;
					option2.innerText = option2.value + '(预留手机号)';
					select_tel.appendChild(option2);
				}
			}

			//点击筛选按钮
			$("#btn_seco").click(function() {
				window.parent.parent.window.myIframe.src = "html/selecthelp.html"
			})
			//切换帮助方式
			$("#sec_qiehuan").change(function() {
				if($("#sec_qiehuan option:selected").val() == 2) {
					$("#div_sela").css('display', 'none');
					$("#div_selb").css('display', 'block');
				} else {
					$("#div_selb").css('display', 'none');
					$("#div_sela").css('display', 'block');
				}
			})

			window.parent.window.watch = function(pro, callback) {

				var old = this[pro];
				Object.defineProperty(this, pro, {
					set: function(val) {
						var o = old;
						old = val;
						callback(val, o, this);
					},
					get: function() {
						return old;
					}
				});

			};

			(function() {

				if(window.parent.window.loc) {
					parseAddress();

				} else {
					window.parent.window.watch("loc", function(n) {
						parseAddress();
					});
				}
			})();

			//地址解析

			function parseAddress() {

				var geoc = new BMap.Geocoder();
				var loc = window.parent.window.loc;
				var point = new BMap.Point(loc.lng, loc.lat);
				geoc.getLocation(point, function(rs) {
					var addComp = rs.addressComponents;
					//console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
					var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;

					$('#input_add').val(address);
				})
			}