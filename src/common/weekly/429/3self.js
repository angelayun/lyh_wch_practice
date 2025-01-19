/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function (nums, k) {
  let pre = -Infinity;
  nums.sort((a, b) => a - b);
  let ans = 0;
  for (let x of nums) {
    let cur = Math.min(Math.max(pre + 1, x - k), x + k);
    if (cur > pre) {
      ans++;
      pre = cur;
    }
  }
  return ans;
};
// 灵神的这个解法真的很妙呀