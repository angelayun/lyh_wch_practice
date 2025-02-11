// 计算最小值的贡献
const sumSubArrayMins = (nums, k) => {
  const n = nums.length;
  // 左边界 left[i] 为左侧严格小于 nums[i] 的最近元素位置（不存在时为 -1）
  let left = new Array(n).fill(-1);
  // 右边界 right[i] 为右侧小于等于 nums[i] 的最近元素位置（不存在时为 n）
  let right = new Array(n).fill(n);
  let stack = [-1];
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    while (stack.length > 1 && x <= nums[stack[stack.length - 1]]) {
      right[stack.pop()] = i;
    }
    // if (stack.length) {
    left[i] = stack[stack.length - 1];
    // }
    stack.push(i);
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let x = nums[i],
      l = left[i],
      r = right[i];
    if (r - l - 1 <= k) {
      let cnt = (i - l) * (r - i);
      ans += x * cnt;
    } else {
      l = Math.max(l, i - k);
      r = Math.min(r, i + k);
      cnt = (r - i) * (i - (r - k));
      let cnt2 = ((l + r + k - i * 2 + 1) * (r - l - k)) >> 1;
      ans += x * (cnt2 + cnt);
    }
  }
  return ans;
};
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMaxSubarraySum = function (nums, k) {
  let ans = sumSubArrayMins(nums, k);
  // 所有元素取反，就可以复用同一份代码求最大值的贡献了
  nums = nums.map((v) => -v);
  console.log(nums);
  ans -= sumSubArrayMins(nums, k);
  return ans;
};
// 没有大数溢出的情况
