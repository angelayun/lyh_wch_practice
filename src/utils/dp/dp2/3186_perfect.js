/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function (power) {
  let cnt = new Map()
  // 先统计  因为是在值域上进行动态规划
  for (let x of power) {
    cnt.set(x, (cnt.get(x) || 0) + 1)
  }
  // 对key进行从大到小排序
  let a = Array.from(cnt.keys()).sort((a, b) => a - b)
  /* let memo = new Array(a.length).fill(-1)
  // 从0到i上伤害值之和的 最大值 
  const dfs = (i) => {
    if (i < 0) return 0
    if (memo[i] != -1) return memo[i]
    let x = a[i]
    let j = i;
    // 下一个要看的位置是j-1  所以这里比较的是j-1
    while (j && a[j - 1] >= x - 2) {
      j--
    }
    return memo[i] = Math.max(
      dfs(i - 1),
      dfs(j - 1) + x * cnt.get(x)
    )
  }
  return dfs(a.length - 1) */
  let dp = new Array(a.length + 1).fill(0)
  let j = 0
  for (let i = 0; i < a.length; i++) {
    let x = a[i]
    // 循环之后 j就移动到了x-2的位置
    while (a[j] < x - 2) {
      j++
    }
    dp[i + 1] = Math.max(
      dp[i],
      dp[j] + x * cnt.get(x)
    )
  }
  return dp[a.length]
};