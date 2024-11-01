/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let count = 0;
  for (let i = 2; i < n; i++) {
    let x = nums[i];
    let left = 0,
      right = i - 1;
    while (left < right) {
      let sum = nums[left] + nums[right];
      if (sum > x) {
        count += right - left;
        right--;
      } else {
        left++;
      }
    }
  }
  return count;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let count = 0;
  for (let i = n - 1; i >= 2; i--) {
    if (nums[0] + nums[1] > nums[i]) {
      count += (i + 1) * i + (i - 1) / 6;
      break;
    }
    if (nums[i - 1] + nums[i - 2] <= nums[i]) {
      continue;
    }
    let x = nums[i];
    let left = 0,
      right = i - 1;
    while (left < right) {
      let sum = nums[left] + nums[right];
      if (sum > x) {
        count += right - left;
        right--;
      } else {
        left++;
      }
    }
  }
  return count
};
