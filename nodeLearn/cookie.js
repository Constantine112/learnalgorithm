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