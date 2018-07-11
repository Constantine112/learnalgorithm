/**
 *tcp服务端，最简单版
*/

var net = require('net')

//方法一
var server = net.createServer(function (socket) {

    //新的连接，用于通信的触发事件
    socket.on('data', function () {
        //socket.write用于与客户端发送消息
        socket.write("你好")
    })

    //通信断开时触发的时间
    socket.on('end', function () {
        console.log('连接断开')
    })

    socket.write('欢迎光临《深入浅出Node.js》实例\n')
})

//监听8124端口的情况
server.listen(8124, function () {
    console.log('server bound')
})

//方法二
var server = net.createServer()
server.on("connection", function () {
    //新的连接
})

server.listen(8124)

/**
 * 构建UDP服务端，最简单版
 */

var dragm = require("dragm")

var server = dragm.createSocket('udp4')
 
server.on('message', function (msg, rinfo) {
    console.log('server got: ' + msg + ' form ' + rinfo.address + ':' +rinfo.port)
})

server.on('listening', function () {
    var address = server.address()
    console.log('server listening ' + address.address + ':' +address.port)
})

server.bind(41234)

/**
 * UDP客户端
 */

var dragm = new Buffer('dgram')

var message = new Buffer("深入浅出Node.js")
var client = dgram.createSocket('udp4')
client.send(message, 0, message.length, 41234, 'localhost', function (err, bytes) {
    client.close()
})