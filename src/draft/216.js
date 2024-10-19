/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  // 选或者不选 的思路
  let ans = []
  let path = []
  // t还剩下的和
  const dfs = (i, t) => {
    // 还要选择 d个数
    let d = k - path.length
    // t<0 表示已经凑满了
    // 当前数是i i+1 i+2 i+d-1  这d个数之和都凑不满t 就直接剪枝
    if (t < 0 || t > ((i * 2 - d + 1) * d / 2)) return
    if (d == 0) {
      return ans.push(path.slice())
    }
    // 可以不选
    if (i > d) {
      dfs(i - 1, t)
    }
    path.push(i)
    dfs(i - 1, t - i)
    path.pop()
  }
  dfs(9, n)
  return ans
};

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  // 枚举选哪个 的思路

  let ans = []
  let path = []
  const dfs = (i, t) => {
    let d = k - path.length
    if (t < 0 || t > ((i * 2 - d + 1) * d / 2)) return
    // if (i < d) return
    if (d == 0) {
      return ans.push(path.slice())
    }
    for (let j = i; j >= d; j--) {
      path.push(j)
      dfs(j - 1, t - j)
      path.pop()
    }
  }
  dfs(9, n)
  return ans
};