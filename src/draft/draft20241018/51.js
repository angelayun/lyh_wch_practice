/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let ans = []
  let cols = new Array(n).fill(0)
  let onPath = new Array(n).fill(false)
  let diag1 = new Array(n * 2 - 1).fill(false)
  let diag2 = new Array(n * 2 - 1).fill(false)
  const dfs = (r) => {
    if (r == n) {
      // 到达递归边界
      return ans.push(cols.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)))
    }
    for (let col = 0; col < n; col++) {
      if (!onPath[col] && !diag1[r + col] && !diag2[r - col]) {
        cols[r] = col
        onPath[col] = diag1[r + col] = diag2[r - col] = true
        dfs(r + 1)
        onPath[col] = diag1[r + col] = diag2[r - col] = false
      }
    }
  }
  dfs(0)
  return ans
};