// 自己被环形思路固化  不太对
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  // 求出最大子数组和  最小子数组和
  const n = nums.length
  // 最大子数组和  
  let maxS = Number.MIN_SAFE_INTEGER,
    // 最小子数组和
    minS = 0
  let sum = 0
  // 这俩是动态规划递推变量
  let maxF = 0, minF = 0
  for (let x of nums) {
    maxF = Math.max(maxF, 0) + x
    maxS = Math.max(maxF, maxS)

    minF = Math.min(minF, 0) + x
    minS = Math.min(minS, minF)
    sum += x
  }
  if (sum == minS) {
    // 如果最小子数组就是整个数组，那么跨过边界的子数组是空  
    return maxS
  } else {
    // 要么是中间最大子数组和  要么是两端除去最小子数组和
    return Math.max(maxS, sum - minS)
  }
};