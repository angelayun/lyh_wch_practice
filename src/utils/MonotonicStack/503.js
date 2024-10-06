/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const n = nums.length
  let res = new Array(n).fill(-1)
  let stack = []
  for (let i = 0; i < n >> 1; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i % n]) {
      let index = stack.pop()
      res[index] = nums[i % n]
    }
    stack.push(i % n)
  }
  return res;
};