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
    // 1 2 i是2 这时候还需要选择3个数（i是2即便全选最多只能选择出2个数 所以返回）
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
    // 从后往前  还要选择d个数  (优化之前 if (i < d) return  反过来就是j>=d)
    for (let j = i; j >= d; j--) {
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