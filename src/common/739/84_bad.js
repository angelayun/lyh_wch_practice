/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  heights.push(0);
  heights.unshift(0);
  // 找下一个更高的柱子  矩形的面积就是宽度为两根柱子的之间的距离  高度为两根柱子之间的最小值
  let stack = []; // 单调递增的栈
  const n = heights.length;
  let maxArea = 0;
  for (let i = 0; i < n; i++) {
    while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
      let j = stack.pop();
      // 当前是最高的  栈顶是最小的
      let dh = heights[j];
      let dw = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, dh * dw);
    }
    stack.push(i);
  }
  return maxArea;
};
// 这个其实不是很好理解  我还是不太理解
