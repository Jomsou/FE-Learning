function removeWithoutCopy(arr, item) {
    arr.forEach(function (e) {
        if (e == item) {
            arr.splice(arr.indexOf(item), 1);
            arr.length--;
        }
    });
    return arr;
}

var result = removeWithoutCopy([1, 2, 2, 3, 4, 2, 2], 2);
console.log(result);