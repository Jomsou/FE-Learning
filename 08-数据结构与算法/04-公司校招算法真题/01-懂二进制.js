/**
 * 题目描述

 世界上有10种人，一种懂二进制，一种不懂。那么你知道两个int32整数m和n的二进制表达，
 有多少个位(bit)不同么？

 输入例子:
 1999 2299

 输出例子:
 7
 * */

var countBitDiff = function (m, n) {
    var dif = m ^ n;//先将二者做异或运算，得到结果；
    var cnt = 0;
    while (dif != 0) {
        dif = dif & (dif - 1);
        cnt++;
    }             //统计一个整数dif含有多少个1；
    return cnt;
}

console.log(countBitDiff(16807, 282475249));  //16
console.log(countBitDiff(1999, 2299));  //7