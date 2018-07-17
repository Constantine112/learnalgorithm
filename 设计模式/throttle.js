var throttle = function ( fn, interval ) {
    var _self = fn, // 保存需要被延迟执行函数引用
        timer,      // 定时器
        firstTime = true; // 是否是第一次调用

    return function () {
        var args = arguments,
            _me = this;

        if ( firstTime ) { // 第一次调用，不需要延迟执行
            _self.apply(_me, args);
            return firstTime = false;
        }

        if ( Timer ) {  //如果定时器还在，说明前一次延迟还没执行完成
            return false
        }

        timer = setTimeout( function () {
            clearTimeout(Timer);
            timer = null;
            _self.apply(_me, args);
        }, interval || 500 )
    }
}

window.onresize = throttle(function () {
    console.log(1)
}, 500 )