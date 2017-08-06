/**
 * Created by csip on 17/5/10.
 */


var strTools = {};

//处理jsonp返回的带有callback的数据
strTools.parseCallBackData = function (data) {
    var start = data.indexOf('{');
    var end = data.lastIndexOf('}');
    return JSON.parse(data.substring(start, end + 1));
}

//将参数转化为url路径
strTools.appendUrl = function(params) {
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


module.exports = strTools;