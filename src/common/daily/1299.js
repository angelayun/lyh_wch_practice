/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function (arr) {
  let stack = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    let cur = arr[i];
    if (stack.length === 0) arr[i] = -1;
    else {
      arr[i] = stack[stack.length - 1];
    }
    // 栈非空  或者   栈顶元素小于当前元素
    if (!stack.length || (stack.length && stack[stack.length - 1] < cur)) {
      // 当前元素入栈 保持单调递增性
      stack.push(cur);
    }
    console.log(stack)
  }
  return arr;
};
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function (arr) {
  const n = arr.length;
  let ans = new Array(n).fill(-1);
  let sufMax = arr[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    ans[i] = sufMax;
    sufMax = Math.max(sufMax, arr[i]);
  }
  return ans;
};
// 优化一下  空间复杂度为O(1)
var replaceElements = function (arr) {
  const n = arr.length;
  let sufMax = arr[n - 1];
  arr[n-1]=-1
  for (let i = n - 2; i >= 0; i--) {
    let x= arr[i]
    arr[i] = sufMax;
    sufMax = Math.max(sufMax, x);
  }
  return arr;
};