/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var validSubarraySize = function (nums, threshold) {
  const n = nums.length;
  let fa = Array.from({ length: n + 1 }, (v, k) => k);
  let sz = new Array(n + 1).fill(1);
  // 返回x所在集合的根节点  对于本题目来讲是链的最右端
  let find = (x) => {
    if (fa[x] != x) {
      fa[x] = find(fa[x]);
    }
    return fa[x];
  };
  nums = nums.map((v, i) => {
    return [v, i];
  });
  // 数字从大到小排序
  nums.sort((a, b) => b[0] - a[0]);
  for (let [num, i] of nums) {
    // j是右边的那个
    let j = find(i + 1);
    fa[i] = j;
    sz[j] += sz[i];
    // 对于3个点来说  只有2个线吧  我暂时是这样理解的
    let arrSize = sz[j] - 1;
    if (num > Math.floor(threshold / arrSize)) {
      return arrSize;
    }
  }
  return -1;
};
/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var validSubarraySize = function (nums, threshold) {
  const n = nums.length;
  // left[i] 为左侧小于 nums[i] 的最近元素位置（不存在时为 -1）
  let left = new Array(n).fill(-1);
  let stack = [];
  for (let i = 0; i < n; i++) {
    let v = nums[i];
    while (stack.length && nums[stack[stack.length - 1]] >= v) stack.pop();
    if (stack.length) {
      left[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  // right[i] 为右侧小于 nums[i] 的最近元素位置（不存在时为 n）
  let right = new Array(n).fill(n);
  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    let v = nums[i];
    while (stack.length && nums[stack[stack.length - 1]] >= v) stack.pop();
    if (stack.length) {
      right[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  for (let i = 0; i < n; i++) {
    let k = right[i] - left[i] - 1;
    if (nums[i] > Math.floor(threshold / k)) return k;
  }
  return -1;
};
