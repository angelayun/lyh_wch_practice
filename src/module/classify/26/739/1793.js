/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumScore = function (nums, k) {
  const n = nums.length;
  let left = new Array(n).fill(-1);
  let stack = [];
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    // 当前这个数小于栈顶元素（也就是说栈顶元素比它大就弹它）  就弹它  保证最后还在栈顶元素比当前元素小
    while (stack.length && x <= nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    if (stack.length) {
      left[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  let right = new Array(n).fill(n);
  stack = [];
  for (let j = n - 1; j >= 0; j--) {
    let x = nums[j];
    while (stack.length && x <= nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    if (stack.length) {
      right[j] = stack[stack.length - 1];
    }
    stack.push(j);
  }
  let maxArea = 0;
  for (let i = 0; i < n; i++) {
    let h = nums[i],
      l = left[i],
      r = right[i];
    if (l < k && k < r) {
      // 这里是-1 因为左右
      maxArea = Math.max(maxArea, (r - l - 1) * h);
    }
  }
  return maxArea;
};
