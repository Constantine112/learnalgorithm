//分时函数
/**
 * @param  {ary} [创建节点的时候用到的数据]
 * @param  {Function} [创建节点逻辑的函数]
 * @param  {[number]} [每一批创建节点的数量] 
 * @return {[function]}
 */
var timeChunk = function ( ary, fn, count ) {
    var obj,
        t;

    var len = ary.length;
    var start = function () {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    };

    return function () {
        t = setInterval(function () {
            if (ary.length === 0) {
                return clearInterval(t)
            };
            start();
        }, 200);
    };
}