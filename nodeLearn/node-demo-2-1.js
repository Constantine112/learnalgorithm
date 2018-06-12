let app = connect ()

//Middleware
app.use(connect.staticCache())
app.use(connect.static(_dirname + '/public'))
app.use(connect.cookieParser())
app.use(connect.session())
app.use(connect.query())
app.use(connect.bodyParser())
app.use(connect.csrf())
app.listen(3001)

function createServer() {
    function app (req. res) {
        app.handle(req, res)
    }

    utils.merge(app, proto)
    utils.merge(app, EventEmitter.prototype)

    app.route = '/'
    app.stack = []

    for (let i = 0; i < arguments.length; i++) {
        app.use(arguments[i])
    }

    return app
}


app.use = function (route, fn) {
    this.stack.push({
        route: route,
        handle: fn
    })

    return this
}

app.listen = function () {
    let server = http.createServer(this)

    return server.listen.apply(server, arguments)
}

app.handle = function (req, res, out) {
    next()
}

function next (err) {
    layer = stack[index++]

    layer.handle(req, res, next)
}

//利用async的方法能简单的实现异步操作
//异步操作
async.series([
    function (callback) {
        fs.readFile('file1.txt', 'utf-8', callback)
    },
    function (callback) {
        fs.readFile('file2.txt', 'utf-8', callback)
    }
], function (err, results) {

})

//异步并行操作
async.parallel([
    function (callback) {
        fs.readFile('file1.txt', 'utf-8', callback)
    },
    function (callback) {
        fs.readFile('file2.txt', 'utf-8', callback)
    }
], function (err, results) {

})

//前一个结果是后一个调用的输入
async.waterfall([
    function (callback) {
        fs.readFile('file1.txt', 'utf-8', callback)
        callback(err, content)
    },
    function (arg1, callback) {
        fs.readFile(arg1, 'utf-8', function (err, content) {
            callback(err, content)
        })
    },
    function (arg2, callback) {
        fs.readFile(arg2, 'utf-8', function (err, content) {
            callback(err, content)
        })
    },
], function (err, result) {
    
})