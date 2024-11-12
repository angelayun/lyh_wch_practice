/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (nums, k) {
  const n = nums.length;
  let ans = new Array(n - k + 1).fill(0);
  // 初始值为0
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    // 满足递增就cnt++
    if (i == 0 || nums[i] == 1 + nums[i - 1]) {
      cnt++;
    } else {
      cnt = 1;
    }
    // 代入特例进去  如果一开始就是递增的
    if (cnt >= k) {
      // 结果为递增的最后面一个值的结果
      ans[i - k + 1] = nums[i];
    }
  }
  return ans;
};
