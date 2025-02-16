/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function (nums, k) {
  let ans = Infinity;
  let minS = new Map();
  let s = 0;
  for (let x of nums) {
    minS.set(x, Math.min(x, minS.get(x) || Infinity));
    s += x;
    ans = Math.max(
      ans,
      s - (minS.get(x - k) || Infinity),
      s - (minS.get(x + k) || Infinity)
    );
  }
  return ans == Infinity ? 0 : ans;
};
