/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let stack = [-1];
  let maxArea = 0;
  for (let i = 0; i < heights.length; i++) {
    // 当前柱子的高度小于位于栈顶的柱子的高度
    while (
      stack[stack.length - 1] != -1 &&
      heights[stack[stack.length - 1]] >= heights[i]
    ) {
      // 以栈顶的柱子为高度计算面积
      let height = heights[stack.pop()];
      let width = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    // 当前柱子的高度大于位于栈顶的柱子的高度  入栈
    stack.push(i);
  }
  // 计算末尾
  while (stack[stack.length - 1] != -1) {
    let height = heights[stack.pop()];
    let width = heights.length - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, height * width);
  }
  return maxArea;
};
