/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;
  let ans = Array.from({ length: n }, () => 1);
  for (let i = n - 1; i > 0; i--) {
    // 先把后缀乘积都放入结果中
    ans[i - 1] = ans[i] * nums[i];
  }
  let pre = 1;
  for (let i = 0; i < n; i++) {
    // 把前缀的乘积都放入结果中
    ans[i] *= pre;
    pre *= nums[i];
  }
  return ans;
};
