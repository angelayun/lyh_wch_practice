/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
  const n = nums.length;
  let ans = Number.MAX_SAFE_INTEGER;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] >= k) {
      return 1;
    }
    for (let left = right - 1; left >= 0; left--) {
      if ((nums[left] | nums[right]) >= k) {
        ans = Math.min(ans, right - left + 1);
      }
      if ((nums[left] | nums[right]) == nums[left]) break;
      nums[left] |= nums[right];
    }
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
  const n = nums.length;
  let ans = Number.MAX_SAFE_INTEGER;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] >= k) {
      return 1;
    }
    for (let left = right - 1; left >= 0; left--) {
      if ((nums[left] | nums[right]) == nums[left]) break;

      nums[left] |= nums[right];
      if (nums[left] >= k) {
        ans = Math.min(ans, right - left + 1);
      }
    }
  }
  return ans == Number.MAX_SAFE_INTEGER ? -1 : ans;
};
