/**
 * 题目描述

 有一个长为n的数组A，求满足0≤a≤b<n的A[b]-A[a]的最大值。
 给定数组A及它的大小n，请返回最大差值。

 测试样例：
 [10,5],2

 返回：0
 * */


/**
 * 给一个数prices[]，prices[i]代表股票在第i天的售价，
 * 求出只做一次交易(一次买入和卖出)能得到的最大收益。

 只需要找出最大的差值即可，即 max(prices[j] – prices[i]) ，i < j。
 一次遍历即可，在遍历的时间用遍历low记录 prices[o....i] 中的最小值，就是当前为止的最低售价，
 时间复杂度为 O(n)。

 用类似动态规划的思想，到第i天买入，那么我能赚到的最大利润是多少呢？
 就是i + 1 ~ n天中最大的股价减去第i天的。
 找最大股价的问题可以在找第i+1~n天的最大利润时顺便记录.
 * */

/*
 * A: Array of Integers
 * n: length of A
 *
 * 同买卖股票这题一样
 * */
function getDis(A, n) {
    if (n === 0) {
        return 0;
    }

    var max = A[n - 1];
    var ans = 0;
    for (var i = n - 1; i >= 0; i--) {
        max = Math.max(max, A[i]);
        ans = Math.max(ans, max - A[i]);
    }

    return ans;
}


console.log(getDis([1, 2, 3, 4, 9, 6], 6));
