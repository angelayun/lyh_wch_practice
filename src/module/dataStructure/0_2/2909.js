/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumSum = function (nums) {
  const n = nums.length;
  let ans = Number.MAX_SAFE_INTEGER;
  // 后缀最小值
  let sufix = new Array(n).fill(0);
  sufix[n - 1] = nums[n - 1];
  for (let i = n - 2; i > 1; i--) {
    sufix[i] = Math.min(sufix[i + 1], nums[i]);
  }
  // 前缀最小值
  let pre = nums[0];
  // 这里是到n-1  因为需要为后面一个元素留一个位置
  for (let j = 1; j < n - 1; j++) {
    let mid = nums[j];
    if (pre < mid && mid > sufix[j + 1]) {
      ans = Math.min(ans, pre + mid + sufix[j + 1]);
    }
    pre = Math.min(pre, nums[j]);
  }
  return ans == Number.MAX_SAFE_INTEGER ? -1 : ans;
};
