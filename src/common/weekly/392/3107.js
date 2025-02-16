/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperationsToMakeMedianK = function (nums, k) {
  // 对数组进行排序
  nums.sort((a, b) => a - b);
  // 初始化操作次数为 0
  let ans = 0;
  // 计算数组的中间索引
  const m = Math.floor(nums.length / 2);

  if (nums[m] > k) {
    // 如果中间元素大于 k，从中间元素开始向左遍历
    for (let i = m; i >= 0 && nums[i] > k; i--) {
      // 累加将元素调整为 k 所需的操作次数
      ans += nums[i] - k;
    }
  } else {
    // 如果中间元素小于等于 k，从中间元素开始向右遍历
    for (let i = m; i < nums.length && nums[i] < k; i++) {
      // 累加将元素调整为 k 所需的操作次数
      ans += k - nums[i];
    }
  }

  return ans;
};
