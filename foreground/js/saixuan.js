$(function () {
    $("#btn_secoa").click(function () {
        var method = 'filter';
        var params = {
            token: window.parent.window.token,
//          pulse: $("#pulse_sec option:selected").val(),
            pulse: $("#pulse_sec option:selected").val(),
            longitude: window.parent.window.loc.lng,
            latitude: window.parent.window.loc.lat,
            distance:1000,
            credit: 90,
            evaluate: 0,
        }
        
        console.log(params);
        window.parent.window.requestURL("filter", params, function (data) {
            if(data.success == 1){

            }else {
                alert(data.message[data.state])
            }
        })
        return false;

    })
})


