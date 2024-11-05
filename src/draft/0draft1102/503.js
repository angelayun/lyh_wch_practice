/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const n = nums.length;
  let ans = new Array(n).fill(-1);
  let stack = [];
  for (let i = 0; i < 2 * n; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i % n]) {
      let j = stack.pop();
      ans[j] = nums[i % n];
    }
    stack.push(i % n);
  }
  return ans;
};
