/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  let ans = Number.MIN_SAFE_INTEGER;
  const n = nums.length;
  let winZeroCount;
  for (let left = 0, right = 0; right < n; right++) {
    winZeroCount += nums[right] == 0 ? 1 : 0;
    while (winZeroCount > 1) {
      winZeroCount -= nums[left++] == 0 ? 1 : 0;
    }
    ans = Math.max(ans, winZeroCount == 1 ? right - left + 1 : right - left);
  }
  return ans;
};
