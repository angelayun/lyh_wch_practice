/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const n = nums.length;
  let stack = [];
  let ans = [];
  for (let i = 0; i < n; i++) {
    // 前面的比后面的大  这样队首的是最大的
    while (stack.length && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }
    stack.push(i);
    // 去掉不在范围内的
    if (stack.length && i - stack[0] >= k) {
      stack.shift();
    }
    if (i >= k - 1) {
      ans.push(nums[stack[0]]);
    }
  }
  return ans;
};
