/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    let realIndex = x - 1;
    while (x > 0 && x < n + 1 && nums[realIndex] != x) {
      [nums[realIndex], nums[i]] = [nums[i], nums[realIndex]];
      x = nums[i];
      realIndex = x - 1;
    }
  }
  for (let i = 0; i < n; i++) {
    if (i + 1 != nums[i]) {
      return nums[i];
    }
  }
};
