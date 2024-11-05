/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const n = heights.length;
  let ans = 0;
  // 在 i 左侧的小于 h 的最近元素的下标 left，如果不存在则为 −1
  let left = new Array(n).fill(-1);
  let stack = [];
  for (let i = 0; i < n; i++) {
    let x = heights[i];
    while (stack.length && x <= heights[stack[stack.length - 1]]) {
      stack.pop();
    }
    // 这个时候栈顶的元素比x要小
    if (stack.length) {
      left[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  stack = [];
  // 在 i 右侧的小于 h 的最近元素的下标 right，如果不存在则为 n
  let right = new Array(n).fill(n);

  for (let i = n - 1; i >= 0; i--) {
    let x = heights[i];
    while (stack.length && x <= heights[stack[stack.length - 1]]) {
      stack.pop();
    }
    if (stack.length) {
      right[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, (right[i] - left[i] - 1) * heights[i]);
  }
  return ans;
};
