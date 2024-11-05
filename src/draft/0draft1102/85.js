/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const n = heights.length;
  let stack = [-1];
  let ans = 0;
  for (let i = 0; i < n; i++) {
    while (
      stack[stack.length - 1] != -1 &&
      heights[stack[stack.length - 1]] >= heights[i]
    ) {
      let h = heights[stack.pop()];
      let w = i - stack[stack.length - 1] - 1;
      ans = Math.max(ans, h * w);
    }
    stack.push(i);
  }
  while (stack[stack.length - 1] != -1) {
    let h = heights[stack.pop()];
    let w = n - stack[stack.length - 1] - 1;
    ans = Math.max(ans, h * w);
  }
  return ans;
};

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  // 这里是matrix[0]  
  const n = matrix[0].length;
  let heights = new Array(n).fill(0);
  let ans = 0;
  for (let rows of matrix) {
    for (let i = 0; i < n; i++) {
      if (rows[i] == '0') heights[i] = 0;
      else heights[i]++;
    }
    ans = Math.max(ans, largestRectangleArea(heights));
  }
  return ans;
};
