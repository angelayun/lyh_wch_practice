/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length == 0) return []
  let mapping = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
  const n = digits.length
  let ans = []
  const dfs = (i, path) => {
    if (i == n) {
      return ans.push(path.join(''))
    }
    for (let c of mapping[digits[i] - 0]) {
      path.push(c)
      dfs(i + 1, path)
      path.pop()
    }
  }
  dfs(0, [])
  return ans
};