var Deferred = function () {
    this.state = 'unfulfilled'
    this.promise = new Promise()
}

Deferred.prototype.resolve = function (obj) {
    this.state = 'fulfilled'
    this.promise.emit('success', obj)
}

Deferred.prototype.reject = function (err) {
    this.state = 'failed'
    this.promise.emit('error', err)
}

Deferred.prototype.process = function (data) {
    this.promise.emit('process', data)
}

let promisefy = function (res) {
    let deferred = new Deferred()
    let result = ''

    res.setEncoding('utf8')

    res.on('data', function (chunk) {
        result += chunk
        deferred.process(chunk)
    })

    res.on('end', function () {
        deferred.resolve(result)
    })

    res.on('error', function (err) {
        deferred.reject(err)
    })

    return deferred.promise
}

promisefy(res).then(function () {
    //Done
}, function (err) {
    //error
}, function (chunk) {
    //process
    console.log('body: ' + chunk)
})

