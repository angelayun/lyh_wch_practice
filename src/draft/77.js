/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  let ans = []
  let path = []
  const dfs = (i) => {
    // 还要选择多少个数
    let d = k - path.length
    if (i < d) return
    if (d == 0) {
      return ans.push(path.slice())
    }
    // 从后往前  还要选择d个数
    for (let j = i; j > 0; j--) {
      path.push(j)
      dfs(j - 1)
      path.pop()
    }
  }
  dfs(n)
  return ans
};
// 上面这种更好理解 下面是在上面那种基础上优化了的
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  let ans = []
  let path = []
  const dfs = (i) => {
    // 还要选择多少个数
    let d = k - path.length
    if (d == 0) {
      return ans.push(path.slice())
    }
    // 从后往前  还要选择d个数
    for (let j = i; j > d - 1; j--) {
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
  let ans = []
  let path = []
  const dfs = (i) => {
    // 还要选择多少个数
    let d = k - path.length
    if (d == 0) {
      return ans.push(path.slice())
    }
    // 如果 i > d，可以不选 i
    if (i > d) {
      dfs(i - 1)
    }
    // 选i 
    path.push(i)
    dfs(i - 1)
    path.pop()
  }
  dfs(n)
  return ans
};