/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  let cnt = new Map();
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (cnt.has(x) && i - cnt.get(x) <= k) return true;
    cnt.set(x, i);
  }
  return false;
};
