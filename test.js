/**
 * 数组中只出现一次的两个数
 * */
function onlyAppearOnceTwoNumbers(arr) {
    var val = 0;
    //先对整个数组做异或操作,得到的结果即是两个只出现一次的数字异或的结果
    for (var i = 0; i < arr.length; i++) {
        val ^= arr[i];
    }

    //判断结果中从右往左为1的第k位数
    var count = 0;
    while (val & 1 === 0) {
        count++;
        val = val >> 1;
    }

    //根据第一个为1的那个位将原数组分拆分为为两个数组
    //两个只出现一次的数字被分散到两个不同的数组中去了
    var arr1 = [], arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] & 1 === 1) {
            arr1.push(arr[i]);
        } else {
            arr2.push(arr[i]);
        }
    }

    console.log(arr1);
    console.log(arr2);

    //再分别对两个数组做异或操作,得到结果
    var result = [], val1 = 0, val2 = 0;
    for (var i = 0; i < arr1.length; i++) {
        val1 ^= arr1[i];
    }
    for (var j = 0; j < arr1.length; j++) {
        val2 ^= arr2[j];
    }

    result.push(val1, val2);
    return result;
}

console.log(onlyAppearOnceTwoNumbers([1, 2, 3, 4, 5, 6, 7, 8, 6, 5, 4, 3, 2, 1]));