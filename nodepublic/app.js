import express from "express"
import http from 'http'
import fs from 'fs'

const APP = express()

app.set('port', process.env.PORT || 3000)

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

//404 page
app.use(funtion (req, res) {
	res.type('text/html')
	res.status(404)
	serveStaticFile(res, '/public/404.html', 'text/html', 404)
})