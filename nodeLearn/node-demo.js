// promise链式调用
var Deferred = function () {
    this.promise = new Promise ()
}

//完成态
Deferred.prototype.resolve = function (obj) {
    var promise = this.promise
    var handler

    while (( handler = promise.queue.shilf() )) {
        if (handler && handler.fulfilled) {
            var ret = handler.fulfilled(obj)

            if (ret && ret.isPromise) {
                ret.queue = promise.queue
                this.promise = ret
                return
            }
        }
    }
}

//失败态
Deferred.prototype.reject = function (obj) {
    var promise = this.promise
    var handler

    while (( handler = promise.queue.shilf() )) {
        if (handler && handler.error) {
            var ret = handler.error(err)

            if (ret && ret.isPromise) {
                ret.queue = promise.queue
                this.promise = ret
                return
            }
        }
    }
}

//生成回调函数
Deferred.prototype.callback = function () {
    var that = this
    return function (err, file) {
        if (err) {
            return that.reject(err)
        }
        that.resolve(file)
    }
}

var Promise = function () {
    //队列用于存储待执行的回调函数
    this.queue = []
    this.isPromise = true
}

promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    var handler = {}
    if (typeof fulfilledHandler === 'function') {
        handler.fulfilled = fulfilledHandler
    }

    if (typeof errorHandler === 'function') {
        handler.error = errorHandler
    }
    this.queue.push(handler)
    return this
}

var readFile1 = function (file, encoding) {
    var deferred = new Deferred ()
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise
}

var readFile2 = function (file, encoding) {
    var deferred = new Deferred ()
    fs.readFile(file, encoding, deferred.callback())
    return deferred.promise
}

readFile1('file1.txt', 'utf-8').then(function (file1) {
    return readFile2(file1.trim(), 'utf-8')
}).then(function () {
    console.log(file2)
})