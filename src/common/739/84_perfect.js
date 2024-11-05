/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const n = heights.length;
  let ans = 0;
  let stack = [-1];
  for (let i = 0; i < n; i++) {
    while (
      stack[stack.length - 1] != -1 &&
      heights[stack[stack.length - 1]] >= heights[i]
    ) {
      // 其实跟灵神的思路本质上是一样的  也就是说  栈顶是是最高的  当前i是离栈顶最近的右边索引  stack[stack.length - 1]是离栈顶最近的左边索引
      let h = heights[stack.pop()];
      let w = i - stack[stack.length - 1] - 1;
      ans = Math.max(ans, w * h);
    }
  }
  while (stack[stack.length - 1]) {
    let h = heights[stack.pop()];
    let w = n - stack[stack.length - 1] - 1;
    ans = Math.max(ans, w * h);
  }
  return ans;
};
