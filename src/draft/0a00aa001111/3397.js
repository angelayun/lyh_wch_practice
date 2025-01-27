/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function (nums, k) {
  const n = nums.length;
  let pre = -Infinity;
  nums.sort((a, b) => a - b);
  let cnt = 0;
  for (let x of nums) {
    let cur = Math.min(Math.max(x - k, pre + 1), x + k);
    if (cur > pre) {
      cnt++;
      pre = cur;
    }
  }
  for (let i = 0; i < n; i++) {}
};
