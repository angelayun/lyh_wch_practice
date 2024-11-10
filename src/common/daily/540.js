/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  // 第一眼是没有思路的  看了自己的题解  本质是都是一对一对的 出现一个数字的一定是偶数下标  只需偶数下标跟自己下一个下标比较 就能二分判断
  const n = nums.length;
  let left = 0,
    right = n - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] == nums[mid ^ 1]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return nums[left];
};
