var match = function (pathname, routes) {
    for (var i = 0; i < routes.length; i++) {

        var route = routes[i]

        //正则表达式
        var reg = route[0].regexp
        var keys = route[0].keys
        var matched = reg.exec(pathname)
        if (matched) {
            //抽取具体值
            var params = {}
            for (var i = 0, l = keys.length; i < l; i++) {
                var value = matched[i + 1]
                if (value) {
                    params[keys[i]] = value

                }
            }
            req.params = params

            var action = route[1]
            action(req, res)
            return true
        }
    }
    return false
}

//异常处理
var handleError = function (err, req, res, stack) {
    //选取异常处理中间件
    stack = stacj.filter(function (middleware) {
        return middleware.length ===4
    })

    var next = function () {
        //从stack谁中选取中间件并执行
        var middleware = stack.shift()
        if (middleware) {
            middleware(err, req, res, next)
        }
    }
    next()
}