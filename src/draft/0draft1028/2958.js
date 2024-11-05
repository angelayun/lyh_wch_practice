/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function (nums, k) {
  let cnt = new Map();
  const n = nums.length;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let x = nums[right];
    while (cnt.get(x) >= k) {
      let y = nums[left++];
      cnt.set(y, cnt.get(y) - 1);
    }
    cnt.set(x, (cnt.get(x) || 0) + 1);
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
