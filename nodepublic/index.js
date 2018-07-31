let http = require('http'),
    fs = require('fs');
let serveStaticFile = (res, path, contentType, responseCode) => {
    if (!responseCode) {
        responseCode = 200;
    }
    // console.log(__dirname + path);
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain'});
            res.end('500-Internal Error');
        } else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    });
}
http.createServer(function(req, res) {
    let  path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    
    console.log(path);
    switch(path) {
        case '':    serveStaticFile(res, '/public/home.html', 'text/html', 200);
                    break;
        case '/about': serveStaticFile(res, '/public/about.html', 'text/html');
                       break;
        case '/img/logo.png': serveStaticFile(res, '/public/img/logo.png', 'image/png', 200);
                              break;
        default: serveStaticFile(res, '/public/404.html', 'text/html', 404);
                 break;
    }
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('hello World');
}).listen(3000);

console.log('server startrd on localhost:3000; press Ctrl-c to terminate');