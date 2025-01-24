/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumIndex = function (nums) {
  let mode = nums[0];
  let cnt = new Map();
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
    if (cnt.get(x) > cnt.get(mode) ?? 0) {
      mode = x;
    }
  }
  let total = cnt.get(mode);
  let freq1 = 0;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (x == mode) freq1++;
    if (freq1 * 2 > i + 1 && (total - freq1) * 2 > nums.length - i - 1) {
      return i;
    }
  }
  return -1;
};
