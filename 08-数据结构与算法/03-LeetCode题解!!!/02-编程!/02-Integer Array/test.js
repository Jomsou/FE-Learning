function partitionArrayByOddAndEven(nums) {
    if (!nums || !nums.length) {
        return [];
    }

    var low = 0, high = nums.length - 1;

    while (low < high) {
        while (nums[low] % 2 === 1) {
            low++;
        }

        while (nums[high] % 2 === 0) {
            high--;
        }

        if (low < high) {
            var tmp = nums[low];
            nums[low] = nums[high];
            nums[high] = tmp;
        }
    }

    return nums;
}

console.log(partitionArrayByOddAndEven([2, 4, 6, 8, 10, 1, 3, 5, 7, 9]));