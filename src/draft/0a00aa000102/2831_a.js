/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestEqualSubarray = function (nums, k) {
  const n = nums.length;
  let pos = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < n; i++) {
    pos[nums[i]].push(i);
  }
  let ans = 0;
  for (let ps of pos) {
    let left = 0;
    for (let [right, p] of ps.entries()) {
      while (ps[right] - ps[left] + 1 - (right - left + 1) > k) {
        left++;
      }
    }
    ans = Math.max(right - left + 1, ans);
  }
  return ans;
};
