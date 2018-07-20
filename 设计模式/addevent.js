// 惰性加载函数
/**
 * [addEvent 惰性加载函数的例子]
 * @param {[element]} ele     [表示需要添加事件的节点]
 * @param {[String]} type    [触发事件的动作]
 * @param {[function]} handler [callback函数]
 */
var addEvent = function (ele, type, handler) {
    if (window.addEventListener) {
        addEvent = function (ele, type, handler) {
            ele.addEventListener(type, handler, false)
        }
    } else if (window.attachEvent) {
        addEvent = function (ele, type, handler) {
            ele.addEventListener('on' + type, handler)
        }
    }

    addEvent(ele, type, handler)
}