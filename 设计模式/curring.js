var curring = function ( fn ) {
    var args = []
    return function () {
        if ( arguments.length === 0 ) {
            return fn.apply( this, args )
        } else {
            [].push.apply( args, arguments )
            return arguments.callee
        }
    }
}

var cost = (function () {
    var money = 0

    return function () {
        for (var i = 0; i < arguments.length; i++) {
            money += arguments[i]
        }
        return money
    }
})()

var cost = curring( cost )

cost( 100 )
cost( 200 )
cost( 300 )
console.log( cost() )
// ClampDoor = function (name, height, weight, age) {
//     this.name = name
//     this.height = height
//     this.weight = weight
//     this.age = age
//     return function () {
//         return {
//             getName: function () {
//                 return this.name
//             }
//         }
//     }
// }

Function.prototype.uncurring = function () {
    var self = this
    return function () {
        var obj = Array.prototype.shift.call( arguments )
        return self.apply( obj, arguments )
    }
}

var push = Array.prototype.uncurring()
(function () {
    push( arguments, 4 )
    console.log( arguments )
})(1, 2, 3)

Function.prototype.uncurring = function () {
    var self = this
    return function () {
        var obj = Array.prototype.shift.call( arguments )
        return self.apply( obj, arguments )
    }
}
var push = Array.prototype.uncurring()
var obj = {
    "length": 1,
    "0", 1
}
push( obj, 2 )
console.log(obj)