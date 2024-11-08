/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (nums, k) {
  let cnt = 0;
  let n = nums.length;
  let ans = new Array(n - k + 1).fill(-1);
  for (let i = 0; i < n; i++) {
    if (i == 0 || nums[i - 1] + 1 == nums[i]) {
      cnt++;
    } else {
      cnt = 1;
    }
    if (cnt >= k) {
      ans[i - k + 1] = nums[i];
    }
  }
  return ans;
};
