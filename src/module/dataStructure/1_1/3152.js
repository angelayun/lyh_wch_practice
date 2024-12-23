/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function (nums, queries) {
  const n = nums.length;
  // 如果nums[i]和nums[i+1]奇偶性不同 则为0  否则为1
  let prefixSum = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + (nums[i] % 2 == nums[i - 1] % 2 ? 1 : 0);
  }
  let res = [];
  for (let [start, end] of queries) {
    // 从start到end中是否包含1 如果不包含1则为true，否则为false
    res.push(prefixSum[end] - prefixSum[start] == 0 ? true : false);
  }
  return res;
};
