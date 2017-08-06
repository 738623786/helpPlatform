/**
 * Created by fjl on 17/4/13.
 * socket.io数据中转站（完成用户数据的转发）
 */

var transpond = {};

transpond.ioServer = function(httpServer) {
	var io = require('socket.io')(httpServer);
	io.on('connection', function(socket) {


	});
	return io;
}
module.exports = transpond;

