/**
 * @param {number[]} heights
 * @return {number}
 */
var maximumSumOfHeights = function (heights) {
  const n = heights.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let x = heights[i];
    let s = x,
      mn = x;
    for (let j = i - 1; j >= 0; j--) {
      mn = Math.min(heights[j], mn);
      s += mn;
    }
    mn = x;
    for (let j = i + 1; j < n; j++) {
      mn = Math.min(mn, heights[j]);
      s += mn;
    }
    ans = Math.max(ans, s);
  }
  return ans;
};
/**
 * @param {number[]} heights
 * @return {number}
 */
var maximumSumOfHeights = function (heights) {
  const n = heights.length;
  let suf = new Array(n + 1).fill(0);
  let stack = [n];
  let s = 0;
  // 右边是递减的
  for (let i = n - 1; i >= 0; i--) {
    let x = heights[i];
    while (stack.length > 1 && x <= heights[stack[stack.length - 1]]) {
      let j = stack.pop();
      s -= (stack[stack.length - 1] - j) * heights[j];
    }
    s += (stack[stack.length - 1] - i) * x;
    stack.push(i);
    suf[i] = s;
  }
  s = 0;
  stack = [-1];
  let prefix = new Array(n).fill(0);
  // 左边是递增的
  for (let i = 0; i < n; i++) {
    let x = heights[i];
    while (stack.length > 1 && x <= heights[stack[stack.length - 1]]) {
      let j = stack.pop();
      s -= (j - stack[stack.length - 1]) * heights[j];
    }
    s += (i - stack[stack.length - 1]) * x;
    stack.push(i);
    prefix[i] = s;
  }
  let ans = suf[0];
  for (let i = 0; i < n - 1; i++) {
    ans = Math.max(ans, suf[i + 1] + prefix[i]);
  }
  return ans;
};
