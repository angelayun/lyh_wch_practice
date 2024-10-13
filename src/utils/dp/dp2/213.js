/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let innerRob = (nums) => {
    const n = nums.length
    let f0 = 0, f1 = 0
    for (let i = 0; i < n; i++) {
      // dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
      let newF = Math.max(f1, f0 + nums[i])
      f0 = f1
      f1 = newF
    }
    return f1
  }
  const n = nums.length

  return Math.max(
    // 第0个抢，只能抢 [2,n-2]
    innerRob(nums.slice(2, n - 1)) + nums[0],
    // 第0个不抢，只能抱[1,n-1]
    innerRob(nums.slice(1))
  )
};