/**
 * 二进制中1的个数
 *
 * 例如:9的二进制表示是1001,那1的个数就是2
 *
 * 思路: 先判断最右边一位是不是1,然后每次右移一位,再判断最右边是不是1.
 *
 * 那如何判断最右边是不是1? -> 与1做按位与运算
 * */


//存在问题的代码!!!输入负数会死循环!!!
function numberOf1(num) {
    var count = 0;
    while (num) {
        if (num & 1) {
            count += 1;
        }

        num = num >> 1;
    }

    return count;
}


console.log(numberOf1(19));
console.log(numberOf1(9));
console.log(numberOf1(0));
// console.log(numberOf1(-19));  //死循环!