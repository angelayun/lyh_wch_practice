/**
 * @param {number[]} nums
 * @return {number}
 */
var countBadPairs = function (nums) {
  const n = nums.length;
  let cnt = new Map();
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let num = nums[i];
    ans += cnt.get(num - i) ?? 0;
    cnt.set(num - i, (cnt.get(num - i) || 0) + 1);
  }
  return ((n * (n - 1)) >> 1) - ans;
};
