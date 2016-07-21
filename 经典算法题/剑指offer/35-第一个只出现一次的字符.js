/**
 * 第一个只出现一次的字符
 * */

function firstOnlyOne(str) {
    if (!str) {
        return null;
    }

    var a = [];

    for (var i = 0, l = str.length; i < l; i++) {
        var ele = str[i];
        var index = a.indexOf(ele);

        if (index === -1) {
            a.push(ele);
        } else {
            a.splice(index, 1);
        }
    }

    if (a.length) {
        return a[0];
        // return a;  //找出所有只出现一次的字符
    }
    return null;
}

console.log(firstOnlyOne(''));
console.log(firstOnlyOne('hello'));
console.log(firstOnlyOne('hhaay'));
console.log(firstOnlyOne('hhaayy'));