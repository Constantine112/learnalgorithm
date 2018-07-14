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

/**
 * 从http到websocket的转变
 */

 var WebSocket = function (url) {
    //伪代码，解析ws://127.0.0.1:12010/updates,用于请求
    this.options = parseUrl(url)
    this.connect()
 }

 WebSocket.prototype.onopen = function () {
    //TODO
 }

 websocket.prototype.setSocket = function (socket) {
    this.socket = socket
 }

 websocket.prototype.connect = function () {
    let that = this
    let key = new Buffer(this.options.protocolVersion + ' - ' + Date.now()).toString('base64')
    let shasum = crypt.createHash('sha1')

    let expected = shasum.update(key + '258EFA5-E914-47DA-95CA-c5ABODC85B11').digest('base64')

    var option = {
        port: this.options.port,
        host: this.options.hostname,
        headers: {
            "connection": "Upgrade",
            'Upgrade': 'websocket',
            'Sec-Websocket-Version': this.options.protocolVersion,
            'Sec-Websocket-Key': key
        }
    }
    let req = http.requset(options)
    req.end()

    req.on('upgrade', function (res, socket, upgradeHead) {
        //连接成功
        that.setSocket(socket)
        // 触发open事件
        that.onopen()
    })
 }


/**
* 通过TLS创建一个安全的TCP服务
*/
var tls = require('tls')
var fs = require('fs')

var options = {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
    requestCert: true,
    ca: [ fs.readFileSync('./keys/ca.crt') ]
}

var server = tls.createServer(options, function (stream) {
    console.log('server connected', sream.authorized ? 'authorized' : 'unauthorized')
    stream.write('welcome!\n')
    stream.setEncoding('utf8')
    stream.pipe(stream)
})
server.listen(8000, function () {
    console.log('server bound')
})

/**
* TLS客户端
*/
var tls = require("tls")
var fs = require('fs')

var options = {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
    ca: [ fs.readFileSync('./keys/ca.crt') ]
}

var stream = tls.connect(8000, options, function () {
    console.log('client connect', stream.authorized ? 'authorized' : 'unauthorized')
    process.stdin.pipe(stream)
})

stream.setEncoding('utf8')
stream.on('data', function (data) {
    console.log(data)
})

stream.on('end', function () {
    server.close()
})