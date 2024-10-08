const max = (a, b) => a > b ? a : b
const min = (a, b) => a < b ? a : b
/* 最大子数组存在于单个数组内，此时最大和即为单个数组内的最大子数组和
最大子数组横跨两个数组，此时最大和即为单个数组内的最大前缀和加上最大后缀和
最大子数组横跨多个数组，此时要求单个数组总和大于0，此时最大和即为k-2个数组和加上最大前缀和加上最大后缀和 */
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var kConcatenationMaxSum = function (arr, k) {
  const MOD = BigInt(10 ** 9 + 7)
  let preSum = 0n, preMax = 0n, preMin = 0n
  let res = 0n
  for (let x of arr) {
    preSum = preSum + BigInt(x)
    // 单个子数组内的最大和  当前前缀和减去之后前缀和的最小值
    res = max(res, preSum - preMin)
    preMin = min(preMin, preSum)
    // 子数组的最大前缀和
    preMax = max(preMax, preSum)
  }

  let sufixMax = 0n, curPreSum = 0n
  for (let i = arr.length - 1; i >= 0; i--) {
    curPreSum += BigInt(arr[i])
    sufixMax = max(sufixMax, curPreSum)
  }
  if (k >= 2) {
    res = max(res, preMax + sufixMax)
  }
  if (k >= 2 && preSum > 0) {
    res = max(res, preSum * BigInt(k - 2) + preMax + sufixMax)
  }
  res %= MOD
  return Number(res)
};