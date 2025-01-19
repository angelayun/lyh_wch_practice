/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  const n = nums.length;
  let set = new Set();
  for (let i = n - 1; i >= 0; i--) {
    if (set.has(nums[i])) {
      return Math.ceil((i + 1) / 3);
    }
    set.add(nums[i]);
  }
  return 0;
};
