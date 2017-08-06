/**
 *w
 */

$('#btn_back').click(function() {
	window.history.go(-1);
})

//baidu map
// 百度地图API功能

var map = new BMap.Map("allmap");
var center = map.getCenter(); //我的中心的位置

var geolocation = new BMap.Geolocation();
map.centerAndZoom(center, 15);
map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
map.disableDoubleClickZoom();
geolocation.getCurrentPosition(function(r) {
	if(this.getStatus() == BMAP_STATUS_SUCCESS) {
		var mk = new BMap.Marker(r.point);
		var geoc = new BMap.Geocoder();
		//map.addOverlay(mk);
		map.panTo(r.point);
		console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
		var loc = window.parent.window.loc;
		var point = new BMap.Point(loc.lng, loc.lat);

		geoc.getLocation(point, function(rs) {
			var addComp = rs.addressComponents;
			alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
		});
		//拖动地图获取地图中心点
		$("#allmap").mouseup(function() {
			var geoc = new BMap.Geocoder();
			//var map = new BMap.Map("#allmap");
			var addressCenter = map.getCenter();

			geoc.getLocation(addressCenter, function(rs) {
				var addComp = rs.addressComponents;
				var nowaddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
				$('#input_add').val(addressCenter);
				console.log(nowaddress);
			});

		})

	} else {
		alert('failed' + this.getStatus());
	}
}, {
	enableHighAccuracy: true
})