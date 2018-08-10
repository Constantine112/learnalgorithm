// import express from "express";
// import http from 'http';
// import fs from 'fs';
let express = require('express');
const app = express()

app.set('port', process.env.PORT || 3000)

//404 page
// app.use(funtion(req, res){
//     res.type('text/plain')
//     res.status(404)
//     // serveStaticFile(res, '/public/404.html', 'text/html', 404)
//     res.send('404 - Not Found') 
// })
require('./routes/getData.js')(app)
app.use(function (req, res) {
    res.type('text/plain')
    res.status(404)
    // serveStaticFile(res, '/public/404.html', 'text/html', 404)
    res.send('404 - Not Found') 
})
app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.type('text/plain')
    res.status(500)
    res.send("500 - server Error")
})
app.listen(app.get('port'), function () {
    console.log('server startrd on localhost:' + app.get('port') + '; press Ctrl-c to terminate')
})