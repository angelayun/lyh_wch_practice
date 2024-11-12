/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  const n = nums.length;
  let left = 0,
    right = n - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] != nums[mid ^ 1]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return nums[left];
};
