/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  let stack = [];
  let ans = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let t = temperatures[i];
    while (stack.length && t >= temperatures[stack[stack.length - 1]]) {
      stack.pop();
    }
    if (stack.length) {
      ans[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  return ans;
};
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  let stack = [];
  let ans = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let t = temperatures[i];
    while (stack.length && temperatures[stack[stack.length - 1]] <= t) {
      let j = stack.pop();
      ans[j] = i - j;
    }
    stack.push(i);
  }
  return ans;
};
