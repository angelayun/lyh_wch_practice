/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function (nums) {
  let cnt = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      cnt += hammingWeight(nums[i]^ nums[j]);
    }
  }
  return cnt;
};
// 上面这种方法会超时