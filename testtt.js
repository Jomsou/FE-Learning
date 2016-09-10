(function maxRectArea(arr) {
    var max = Math.max.apply(Math, arr);

    var len = arr.length;

    for (var i = 0; i < len - 1; i++) {
        for (var j = i + 1; j < len; j++) {
            var area = Math.min.apply(Math, arr.slice(i, j + 1)) * (j - i + 1);
            // console.log(i, j, arr.slice(i, j + 1), area);
            if (area > max) {
                max = area;
            }
        }
    }

    console.log(max);
})([281,179,386,165,88,500]);