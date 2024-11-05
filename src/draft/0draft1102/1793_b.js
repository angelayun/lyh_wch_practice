/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumScore = function (nums, k) {
  const n = nums.length;
  let stack = [-1];
  let ans = 0;
  for (let i = 0; i < n; i++) {
    while (
      stack[stack.length - 1] != -1 &&
      nums[stack[stack.length - 1]] >= nums[i]
    ) {
      let r = stack.pop();
      let h = nums[r];
      let w = i - stack[stack.length - 1] - 1;
      if (stack[stack.length - 1] < k && k < r) {
        ans = Math.max(ans, h * w);
      }
    }
    stack.push(i);
  }
  while (stack[stack.length - 1] != -1) {
    let r = stack.pop();
    let h = nums[r];
    let w = n - stack[stack.length - 1] - 1;
    if (stack[stack.length - 1] < k && k < r) {
      ans = Math.max(ans, h * w);
    }
  }
  return ans;
};
// TODO 发现这个我还确实 不是很理解  这个用例还是通不过
