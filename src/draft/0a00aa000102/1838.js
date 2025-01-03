/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function (nums, k) {
  nums.sort((a, b) => a - b);
  let ans = 1;
  let operCount = 0;
  const n = nums.length;
  for (let left = 0, right = 1; right < n; right++) {
    operCount += (right - left) * (nums[right] - nums[right - 1]);
    while (operCount > k) {
      operCount -= nums[right] - nums[left];
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
