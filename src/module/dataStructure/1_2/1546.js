

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maxNonOverlapping = function(nums, target) {
  let n = arr.length;
  let dp = new Array(n + 1).fill(Infinity);
  let res = Infinity;
  let winSum = 0;
  for (let left = 0, right = 0; right < n; right++) {
    winSum += arr[right];
    while (winSum > target) {
      winSum -= arr[left++];
    }
    if (winSum == target) {
      const len = right - left + 1;
      res = Math.min(res, dp[left] + len);
      dp[right + 1] = Math.min(len, dp[right]);
    } else {
      dp[right + 1] = dp[right];
    }
  }
  return res == Infinity ? -1 : res;
};