/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const n = nums.length;
  let ans = [];
  let stack = [];
  for (let i = 0; i < n; i++) {
    // 在入队列的时候，如果发现前面的比自己小  就弹出
    while (stack.length && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }
    stack.push(i);
    // 保证窗口的容量是只有k
    while (stack.length && i - stack[0] >= k) {
      stack.shift();
    }
    if (i >= k - 1) {
      ans.push(nums[stack[0]]);
    }
  }
  return ans;
};
