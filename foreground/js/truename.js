



window.onload = function() {
				var a = document.getElementById("btn_truename");
				a.onclick = function() {
					window.parent.window.myIframe.setAttribute("src", "html/perfectinfor.html")
				}
				var b = document.getElementById("btn_truenamea");
				b.onclick = function() {
					if($("#trueName").val().length == 0) {
						alert("请输入您的姓名！");
						return false;
					}
					if($("#idCard").val().length == 0) {
						alert("请输入您的身份证号！");
						return false;
					}
					

					window.parent.window.real_Name = $("#trueName").val();
					window.parent.window.identity_Card = $("#idCard").val();
					
					
					
					
					
					
					
					window.parent.window.myIframe.setAttribute("src", "html/perfectinfor.html")
				}
				var back = document.getElementsByClassName("icon-jiantou2")[0];
				back.onclick = function() {
					window.history.go(-1);
					return false;
				}
			}

