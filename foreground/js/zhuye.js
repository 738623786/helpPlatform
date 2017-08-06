/**
 * Created by csip on 17/5/9.
 */



    var zhuye = document.getElementById("zhuye_iframe");
    $("#btn_cell1").click(function(){
        if(zhuye.src == 'mainhelp.html'){return false;}
        $(".cell").css({
            background:"cornflowerblue"
        })
        $("#btn_cell1").css({
            background:"pink"
        })
        zhuye.src="mainhelp.html";
        return false;
    })

    $("#btn_cell2").click(function(){
        if(zhuye.src == 'pleasehelp.html'){return false;}
        $(".cell").css({
            background:"cornflowerblue"
        })
        $("#btn_cell2").css({
            background:"pink"
        })

        zhuye.src="pleasehelp.html";
        return false;
    })

    $("#btn_cell3").click(function(){
        if(zhuye.src == 'menhelp.html'){return false;}
        $(".cell").css({
            background:"cornflowerblue"
        })
        $("#btn_cell3").css({
            background:"pink"
        })
        zhuye.src="menhelp.html";
        return false;
    })

    $("#btn_cell4").click(function(){
        if(zhuye.src == 'myinfor.html'){return false;}
        $(".cell").css({
            background:"cornflowerblue"
        })
        $("#btn_cell4").css({
            background:"pink"
        })
        zhuye.src="myinfor.html";
        return false;
    })


//获得当前位置的经度和纬度
function getlocation() {
    window.parent.window.geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var pointA = r.point;

            if(!window.parent.window.loc){  //用户位置不存在
                //上传用户位置
                uploadUserLoc(pointA);
            }else {
                var map = new BMap.Map();
                var distance = map.getDistance(pointA, window.parent.window.loc).toFixed(2);
                if (distance > 100) {
                    //上传用户位置
                    uploadUserLoc(pointA);
                }
            }


        }
    });
}

//上传用户位置
function uploadUserLoc(loc){
    var params = {
        token: window.parent.window.token,
        longitude: loc.lng,
        latitude: loc.lat,
    }

    console.log(params);
    window.parent.window.requestURL("info", params, function (data) {
        if (data.success == 1) {
            window.parent.window.loc = loc;

        } else {
            alert(data.message[data.state]);
        }

    });
}

getlocation();
setInterval(function () {
    getlocation();
}, 30000);



