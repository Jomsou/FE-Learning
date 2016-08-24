//判断是否为丑数
//循环判断法,效率低下
function isUgly(number) {
    while (number % 2 == 0)
        number = number / 2;
    while (number % 3 == 0)
        number = number / 3;
    while (number % 5 == 0)
        number = number / 5;
    return (number === 1) ? true : false;
}

//获取第k个丑数，假定1为第一个丑数
function getUglyNumber(index) {
    var number = 0;
    var count = 0;
    while (count < index) {
        ++number;
        if (isUgly(number))
            count++;
    }
    return number;
}


console.log(getUglyNumber(1500));