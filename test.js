function partialUsingArguments(fn) {
    var _slice = Array.prototype.slice;

    var args = _slice.call(arguments, 1);

    return function () {
        return fn.apply(null, args.concat(_slice.call(arguments)));
    }
}

var a = 1;
var b = 2;
var c = 3;
var d = 4;
var test = function (first, second, third, forth) {
    return first + second + third + forth;
};
var res= partialUsingArguments(test, a, b)(c, d);
console.log(res);