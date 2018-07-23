//parent.js
var cp = require('child_process')
var child1 = cp.fork('child.js')
var child2 = cp.fork('child.js')

//open up the server object and send the handle
var server = require('net').createServer()
server.on('connection', function (socket) {
    socket.end('handle by parent\n')
})

server.listen(1337, function () {
    child1.send('server', server)
    child2.send('server', server)
})

//child.js 
process.on('message', function (m, server) {
    if (m === 'server') {
        server.on('connection', function (socket) {
            socket.end('handle by chuld, pid is ' + precess.pid + '\n')
        })
    }
})


//改进版
//parent.js
var cp = require('child_process')
var child1 = cp.fork('child.js')
var child2 = cp.fork('child.js')

//open up the server object and send the handle
var server = require('net').createServer()
server.on('connection', function (socket) {
    socket.end('handle by parent\n')
})

server.listen(1337, function () {
    child1.send('server', server)
    child2.send('server', server)
    server.close()
})

//child.js 
var http = require('http')
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': 'text/plain'})
    res.end('handle by chuld, pid is ' + precess.pid + '\n')
})
process.on('message', function (m, server) {
    if (m === 'server') {
        server.on('connection', function (socket) {
            server.emit('connection', socket)
        })
    }
})

//自启动线程
//master.js
var fork = require('child_process').fork
var cpus = require('os').cpus()

var server = require('net').createServer()
server.listen(1337)

var workers = {}
var createWorker = function () {
    var worker = fork(_dirname + '/worker.js')
    //退出时重新启动新的线程
    worker.on('exit', funciton () {
        console.log('worker ' + worker.pid + ' exited')
        delete workers[worker.pid]
        createWorker()
    })

    //句柄转发
    worker.send('server', server)
    workers[worker.pid] = worker
    console.log('Create worker.pid: ' + worker.pid)
};

for (let i = 0; i < cpus.length; i++) {
    createWorker()
}

//进程自己退出的时候，让所有工作进程退出
process.on('exit', function () {
    for (var pid in workers){
        workers[pid].kill()
    }
})
/**
 * [description]
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @return {[type]}   [description]
 */
function (a, b) {
 str = 'sdasasdas' + 'sdfd'
}
