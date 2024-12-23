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
    let res = 0;
    let leftMax = 0;
    for (let i = firstLen + secondLen; i < preSum.length; i++) {
      leftMax = Math.max(
        leftMax,
        preSum[i - secondLen] - preSum[i - secondLen - firstLen]
      );
      res = Math.max(res, preSum[i] - preSum[i - secondLen] + leftMax);
    }
    return res;
  };
  return Math.max(fn(firstLen, secondLen), fn(secondLen, firstLen));
};
