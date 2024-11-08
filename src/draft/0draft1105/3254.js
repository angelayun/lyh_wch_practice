/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (nums, k) {
  const n = nums.length;
  let ans = new Array(n - k + 1).fill(-1);
  for (let i = 0; i < n - k; i++) {
    let flag = true;
    let maxVal = nums[i];
    for (let j = i + 1; j < i + k; j++) {
      if (nums[j] <= nums[j - 1]) {
        flag = false;
        break;
      }
      maxVal = nums[j];
    }
    if (flag) ans[i] = maxVal;
  }
  return ans;
};
