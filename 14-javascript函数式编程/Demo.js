/**
 * Created by yijianbo on 2017/5/10.
 */

function splat(func) {
    return function (array) {
        return func.apply(null, array);
    }
}

function add() {
    var result = 0;
    for (var i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
}

var result = splat(add)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(result);