/**
 * @param {number[]} nums
 * @return {number}
 */
var longestNiceSubarray = function (nums) {
  const n = nums.length;
  let ans = 1;
  for (let right = 0; right < n; right++) {
    let left = right - 1;
    let or = 0;
    for (; left >= 0 && (or & nums[left]) == 0; left--) {
      or |= nums[left];
    }
    ans = Math.max(right - left, ans);
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestNiceSubarray = function (nums) {
  const n = nums.length;
  let ans = 1;
  let or = 0;
  for (let left = 0, right = 0; right < n; right++) {
    while (or & nums[right]) {
      or ^= nums[left];
      left++;
    }
    or |= nums[right];
    ans = Math.max(right - left+1, ans);
  }
  return ans;
};
