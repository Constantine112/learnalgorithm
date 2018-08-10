let http = require('http'),
    fs = require('fs');
let serveStaticFile = (res, path, contentType, responseCode) => {
    if (!responseCode) {
        responseCode = 200;
    }
    // console.log(__dirname + path);
    fs.readFile(__dirname + path, function(err, data) {
        // console.log(err)
        if (err) {
            console.log(err)
            res.writeHead(500, { 'Content-Type': 'text/plain'});
            res.end('500-Internal Error');
        } else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            // console.log(data)
            res.end(data);
        }
    });
}
// module.exports = function (app) {
//     app.get('/', function (req, res) {
//         // res.render('index')
//         serveStaticFile(res, './../public/html/index.html', 'text/html', 200)
//     })
// }


module.exports = function (app) {
    // app.get('/', function (req, res) {
    //     // res.render('index')
    //     serveStaticFile(res, './../public/html/index.html', 'text/html', 200)
    // })
    let autoView = {}
    app.use(function (req, res, next) {
        let path = req.path.toLowerCase()
        let paths = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
        // console.log(path)
        //检查缓存
        // if (autoView[path]) return res.render(autoView[path])
        // console.log(paths)
        serveStaticFile(res, './../public' + paths, 'text/html', 200)
        //如果不在缓存
        // if (fs.existsSync(__dirname + './../public/html' + path + '.html')) {
        //     console.log(path)
        //     autoView[path] = path.replace(/^\//, '')
        //     return res.render(autoView[path])
        // }

        // next()
    })
}