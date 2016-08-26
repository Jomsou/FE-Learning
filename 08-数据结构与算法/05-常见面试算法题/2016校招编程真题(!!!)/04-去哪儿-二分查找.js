/**
 * 对于一个有序数组，我们通常采用二分查找的方式来定位某一元素，请编写二分查找的算法，
 * 在数组中查找指定元素。
 给定一个整数数组A及它的大小n，同时给定要查找的元素val，请返回它在数组中的位置(从0开始)，
 若不存在该元素，返回-1。若该元素出现多次，请返回第一次出现的位置。

 测试样例：
 [1,3,5,7,9],5,3

 返回：1
 * */


function getPos(A/*给定数组*/, n/*数组长度*/, val/*待查找值*/) {

    var low = 0, high = n - 1, middle;

    while (low <= high) {
        middle = Math.floor((low + high) / 2);

        if (A[middle] == val) {
            return middle;
        } else if (A[middle] > val) {
            high = middle - 1;
        } else {
            low = middle + 1;
        }
    }

    return -1;
}

console.log(getPos([1, 3, 5, 7, 9], 5, 3));
console.log(getPos([4, 4, 5, 7], 4, 4));