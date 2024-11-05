/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumScore = function (nums, k) {
  const n = nums.length;
  // 单调递增  队头最小
  let stack = [];
  let ans = 0;
  for (let j = 0; j < n; j++) {
    while (stack.length && nums[stack[stack.length - 1]] >= nums[j]) {
      stack.pop();
    }
    if (stack.length) {
      let i= 
      ans = Math.max(ans, (j - stack[stack.length - 1] + 1) * nums[stack[0]]);
    }
    stack.push(j);
  }
  return ans;
};
