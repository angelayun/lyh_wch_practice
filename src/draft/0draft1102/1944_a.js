/**
 * @param {number[]} heights
 * @return {number[]}
 */
var canSeePersonsCount = function (heights) {
  const n = heights.length;
  let stack = [];
  let ans = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] < heights[i]) {
      ans[i]++;
      stack.pop();
    }
    // 如果栈不为空的话  说明当前还能看到栈顶元素
    if (stack.length) {
      ans[i]++;
    }
  }
  return ans;
};
