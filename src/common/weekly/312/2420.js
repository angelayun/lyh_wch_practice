/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var goodIndices = function (nums, k) {
  const n = nums.length;
  let suf = new Array(n).fill(1);
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] <= nums[i + 1]) {
      suf[i] = suf[i + 1] + 1;
    }
  }
  let pre = 1;
  let ans = [];
  for (let i = 1; i < n; i++) {
    if (pre >= k && suf[i + 1] >= k) {
      ans.push(i);
    }
    // 先算答案
    if (nums[i - 1] >= nums[i]) {
      pre++;
    } else {
      pre = 1;
    }
  }
  return ans;
};
