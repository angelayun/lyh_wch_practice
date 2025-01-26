/**
 * @param {number[]} nums
 * @param {number} minK
 * @param {number} maxK
 * @return {number}
 */
var countSubarrays = function (nums, minK, maxK) {
  let ans = 0;
  let minI = -1, maxI = -1, i0 = -1;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (x == minK) minI = i;
    if (x == maxK) maxI = i;
    if (x < minK || x > maxK) i0 = i;
    let j = minI < maxI ? minI : maxI;
    if (j > i0) ans += j - i0;
    // ans += Math.max(Math.min(minI, maxI) - i0, 0)
  }
  return ans;
};
