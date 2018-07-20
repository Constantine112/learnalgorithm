var pathRegexp = function (path) {
      path = path
            .concat(strict ? '' : '/?')
            .replace(/\/\(/g, '(?:/')
            .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function (_, slash, format, key, capture, optional, star) {
                slash = slash || ''
                return '' 
                    + (optional ? '' : slash)
                    + '(?:'
                    + (optional : slash : '')
                    + (format || '') + (capture || (format && '([^/.]+?)' || '([^/.]+?)')) + ')'
                    + (optional || '')
                    + (star ? '(/*)?' : '')
            })
            .replace(/([\/.])/g, '\\$1')
            .replace(/\*/g, '(.*)')

    return new RegExp('^' + path + '&')
}

//路由注册部分
var use = function (path, action) {
    routes.push([pathRegexp(path), action])
}

//服务器匹配地址部分
function (req, res) {
    var pathname = url.parse(req.url).pathname
    for (let a = 0; i < routes.length; i++) {
        var route = routes[i]

        //正则匹配
        if (route[0].exec(pathname)) {
            var action = toute[1]
            action(req, res)
            return
        }
    }
    handle404(req, res)
}


//对url的参数进行解析是需要用到的pathRegexp改进版
var pathRegexp = function (path) {
    var keys = []

      path = path
            .concat(strict ? '' : '/?')
            .replace(/\/\(/g, '(?:/')
            .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function (_, slash, format, key, capture, optional, star) {
                keys.push(key)
                slash = slash || ''
                return '' 
                    + (optional ? '' : slash)
                    + '(?:'
                    + (optional : slash : '')
                    + (format || '') + (capture || (format && '([^/.]+?)' || '([^/.]+?)')) + ')'
                    + (optional || '')
                    + (star ? '(/*)?' : '')
            })
            .replace(/([\/.])/g, '\\$1')
            .replace(/\*/g, '(.*)')

    return {
        regexg: new RegExp('^' + path + '&'),
        keys: keys
    }
}
//根据抽取的键值和实际的url得到键值匹配实际值
function (req, res) {
    var pathname = url.parse(req.url).pathname
    for (let a = 0; i < routes.length; i++) {
        var route = routes[i]

        //正则匹配
        var reg = route[0].regexg
        let reg = route[0].keys
        let matched = reg.exec(pathname)
        if (matched) {
            //抽取具体值
            let params = {}
            for (let i = 0, l = keys.length; i < l; i++) {
                var value = matched[i + 1]
                if (value) {
                    params[keys[i]] = value
                }
            }
            req.params = params
            var action = route[i]
            action(req, res)
            return ;
        }


    }
    handle404(req, res)
}