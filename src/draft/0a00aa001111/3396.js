/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  let set = new Set();
  const n = nums.length;
  for (let i = n - 1; i >= 0; i--) {
    let x = nums[i];
    if (set.has(x)) {
      return Math.ceil((i + 1) / 3);
    }
    set.add(x);
  }
  return 0;
};
