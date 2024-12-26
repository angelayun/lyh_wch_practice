/**
 * @param {number[]} nums
 * @param {number} firstLen
 * @param {number} secondLen
 * @return {number}
 */
var maxSumTwoNoOverlap = function (nums, firstLen, secondLen) {
  // 先求出前缀和
  const n = nums.length;
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] += preSum[i] + nums[i];
  }
  const fn = (firstLen, secondLen) => {
    let leftMax = 0;
    let ans = 0;
    for (let i = firstLen + secondLen; i < preSum.length; i++) {
      leftMax = Math.max(
        leftMax,
        preSum[i - secondLen] - preSum[i - secondLen - firstLen]
      );
      ans = Math.max(ans, preSum[i] - preSum[i - secondLen] + leftMax);
    }
    return ans;
  };
  return Math.max(fn(firstLen, secondLen), fn(secondLen, firstLen));
};
