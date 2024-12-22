/**
 * @param {number[]} nums
 * @param {number} firstLen
 * @param {number} secondLen
 * @return {number}
 */
var maxSumTwoNoOverlap = function (nums, firstLen, secondLen) {
  const n = nums.length;
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }
  const fn = (firstLen, secondLen) => {
    let maxSum = 0,
      res = 0;
    for (let i = firstLen + secondLen; i < preSum.length; i++) {
      // 左边子数组和的最大值
      maxSum = Math.max(
        maxSum,
        preSum[i - secondLen] - preSum[i - secondLen - firstLen]
      );
      res = Math.max(res, maxSum + preSum[i] - preSum[i - secondLen]);
    }
    return res;
  };
  return Math.max(fn(firstLen, secondLen), fn(secondLen, firstLen));
};
