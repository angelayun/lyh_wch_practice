/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // 选或者不选 的思路
  let ans = []
  let path = []
  const dfs = (i) => {
    let d = k - path.length
    if (d == 0) {
      return ans.push(path.slice())
    }
    // 可以不选
    if (i > d) {
      dfs(i - 1)
    }
    path.push(i)
    dfs(i - 1)
    path.pop()
  }
  dfs(n)
  return ans
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // 枚举选哪个 的思路
  let ans = []
  let path = []
  const dfs = (i) => {
    let d = k - path.length
    if (i < d) return
    if (d == 0) {
      return ans.push(path.slice())
    }
    for (let j = i; j > 0; j--) {
      path.push(j)
      dfs(j - 1)
      path.pop()
    }
  }
  dfs(n)
  return ans
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // 枚举选哪个 的思路
  let ans = []
  let path = []
  const dfs = (i) => {
    let d = k - path.length
    // if (i < d) return
    if (d == 0) {
      return ans.push(path.slice())
    }
    for (let j = i; j >= d; j--) {
      path.push(j)
      dfs(j - 1)
      path.pop()
    }
  }
  dfs(n)
  return ans
};