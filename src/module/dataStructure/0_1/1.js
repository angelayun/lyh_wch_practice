/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let cnt = new Map();
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let y = nums[i];
    if (cnt.has(target - y)) {
      return [cnt.get(target - y), i];
    }
    cnt.set(y, i);
  }
  return [-1, -1];
};
