/**
 * 题目描述

 世界上有10种人，一种懂二进制，一种不懂。那么你知道两个int32整数m和n的二进制表达，有多少个位(bit)不同么？

 输入例子:
 1999 2299

 输出例子:
 7
 * */


function countBitDiff(m, n) {
    var val = m ^ n;

    var count = 0;

    // while (val > 0) {
    //     count += val & 1;
    //     val = val >> 1;
    // }

    while (val != 0) {
        val = val & (val - 1);
        count++;
    }

    return count;
}

console.log(countBitDiff(1999, 2299));