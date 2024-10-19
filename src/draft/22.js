/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const m = n * 2;
  let ans = []
  let path = []
  // i 当前填到哪个位置了  open表示当前填了多少个左括号
  const dfs = (i, open) => {
    if (i == m) {
      return ans.push(path.join(""))
    }
    if (open < n) {
      path.push('(')
      dfs(i + 1, open + 1)
      path.pop()
    }
    // 右括号的数量小于左括号的数量  右括号的数量 是i - open
    if (i - open < open) {
      path.push(')')
      dfs(i + 1, open)
      path.pop()
    }
  }
  dfs(0, 0)
  return ans
};