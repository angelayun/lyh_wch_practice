/**
 * @param {number[]} nums
 * @return {number}
 */
var minMaxGame = function (nums) {
  while (nums.length > 1) {
    let b = new Array(nums.length >> 1).fill(0);
    for (let i = 0; i < b.length; i++) {
      if (i & 1) {
        b[i] = Math.max(a[i * 2], a[i * 2 + 1]);
      } else {
        b[i] = Math.min(a[i * 2], a[i * 2 + 1]);
      }
    }
    nums = b;
  }
  return nums[0];
};
