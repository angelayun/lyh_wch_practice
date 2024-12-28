/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
  const n = nums.length
  let totalSum = nums.reduce((pre, cur) => pre + cur);
  let sum = totalSum - x;
  // 让滑窗 宽度最大
  let maxLen = -1;
  let winSum = 0;
  for (let left = 0, right = 0; right < n; right++) {
    winSum += nums[right];
    while (winSum > sum) {
      winSum -= nums[left++];
    }
    if (winSum == sum) {
      console.log(winSum, left, right)
      maxLen = Math.max(maxLen, right - left + 1);
    }
  }
  return maxLen == -1 ? -1 : n - maxLen;
};
