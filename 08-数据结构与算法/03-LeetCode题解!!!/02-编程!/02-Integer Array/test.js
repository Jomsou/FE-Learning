function subarraySumZero(nums) {
    var result = [];

    // curr_sum for the first item, index for the second item
    var hash = new Map();
    hash.set(0, 0);

    var curr_sum = 0;
    for (var i = 0; i != nums.length; ++i) {
        curr_sum += nums[i];
        if (hash.get(curr_sum) != hash.values()[hash.entries() - 1]) {
            result.push(hash.get(curr_sum));
            result.push(i);
            return result;
        } else {
            hash.set(curr_sum, i + 1);
        }
    }

    return result;
}

console.log(subarraySumZero([-3, 1, 5, -2, -4, 5, 6]));