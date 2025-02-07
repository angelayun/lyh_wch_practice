/**
 * @param {number[]} nums
 * @return {boolean}
 */
var findSubarrays = function (nums) {
  const n = nums.length;
  let set = new Set();
  for (let i = 1; i < n; i++) {
    let x = nums[i - 1],
      y = nums[i];
    let sum = x + y;
    if (set.has(sum)) return true;
    set.add(sum);
  }
  return false;
};
