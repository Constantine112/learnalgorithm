//对cookie进行解析
var parseCookie = function (cookie) {
    var cookie = {}

    if (!cookie) {
        return cookie
    }

    var list = cookie.split(';')
    for (let i = 0; i < list.length; i++) {
        let pair = list[i].split('=')
        cookies[pair[0].trim()] = pair[i]
    }
    return cookies
}

function (req, res) {
    req.cookies = parseCookie(req.headers.cookie)
    handle(req, res)
}

var handle = fucntion(req, res) {
    res.writeHead(200)
    if (!req.cookies.isVisit) {
        res.end('欢迎第一次来到node')
    } else {
        //TODO
    }
}



var serialize = function (name, val, opt) {
    var pairs = [name + '=' + encode(val)]
    opt = opt || []

    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge)
    if (opt.domain) pairs.push('Domain=' + opt.domain)
    if (opt.path) pairs.push('Path=' + opt.path)
    if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString())
    if (opt.httpOnly) pairs.push('HttpOnly=' + opt.httpOnly)
    if (opt.secure) pairs.push('Secure')

    return pairs.join('; ')

}

//section异步方式获得的时候的代码
function (req, res) {
    var id = req.cookie[key];
    if (!id) {
        req.session = generate()
        handle(req.res)
    } else {
        store.get(id, function (err, session) {
            if (session) {
                if (session.cookie.expire > (new Data()).getTime()) {
                    //更新超时时间
                    session.cookie.expire = (new Data()).getTime() + Expires
                    req.session = session
                } else {
                    //超时
                    delete session[id]
                    req.session = session
                }
            } else {
                //如果session过期或者口令不对，重新生成session
                req.session = generate()
            }
        })
    }
}

//利用Entity Tag对文件的更改进行条件判断
var getHash = function (str) {
    var shasum = crypto.createHash('sha1')
    return shasum.update(str).digest('base64')
}

var handle = function (req, res) {
    fs.readFile(filename, function (err, file) {
        var hash = getHash(file)
        var noneMatch = req.headers['if-none-match']

        if (hash === noneMatch) {
            res.writeHead(304, 'Not Modified')
            res.end()
        } else {
            res.setHeader('ETag', hash)
            res.writeHead(200, 'OK')
            res.end()
        }
    })
}

var handle = function () {
    if (mime(req) === 'application/json') {
        try {
            req.body = JSON.parse(req.rawBody)
        } catch (e) {
            req.writeHead(400)
            res.end('Invalid JSON')
            return 
        }
    }
}

// 数据上传与安全
var bytes = 1024

function (req, res) {
    var received = 0
    var len = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : null;

    //如果内容超过长度限制，返回请求实体过长的状态码
    if (len && len > bytes) {
        res.writeHead(413)
        res.end()
        return ;
    }

    // limit
    req.on('data', function (chunk) {
        received += chunk.length
        if (received > bytes) {
            //停止接收数据， 触发end
            res.destory()
        }
    })

    handle(req, res)
}