//03. 二维数组中的查找

function findNumber(arr, number) {
    var i = 0, j = arr[0].length;

    while (i < arr.length && j >= 0) {
        if (arr[i][j] === number) {
            return [i, j];
        } else if (arr[i][j] < number) {
            i++;
        } else {
            j--;
        }
    }

    return [-1, -1];  //not found
}


var arr = [
    [1, 2, 8, 9],
    [2, 4, 9, 12],
    [4, 7, 10, 13],
    [6, 8, 11, 15]
];

console.log(findNumber(arr, 15));
console.log(findNumber(arr, 65));
